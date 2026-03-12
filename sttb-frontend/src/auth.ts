import NextAuth, {
  type NextAuthOptions,
  type DefaultSession,
  type Session,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import { loginSchema } from "@/libs/schemas/login-schema";

// ─── Local interfaces ────────────────────────────────────────────────────────

interface DecodedToken {
  sub?: string;
  name?: string;
  exp?: number;
  role?: string;
  iat?: number;
  iss?: string;
  aud?: string;
}

interface AuthorizeResponse {
  id: string;
  email: string;
  name: string;
  role: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  /** Seconds until expiry — from backend LoginResponse.ExpiresIn */
  expiresIn: number;
  role: string;
}

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// ─── Module augmentation — extend next-auth & next-auth/jwt ─────────────────

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id?: string;
      role?: string;
    } & DefaultSession["user"];
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    role?: string;
    error?: string;
  }
}

// ─── Constants ───────────────────────────────────────────────────────────────

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL environment variable is not set");
}

// ─── authOptions ─────────────────────────────────────────────────────────────

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          type: "email",
          label: "E-mail",
          placeholder: "admin@sttb.edu",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "••••••••",
        },
      },
      async authorize(credentials): Promise<AuthorizeResponse | null> {
        const validatedCredentials = await loginSchema.parseAsync(credentials);

        try {
          const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: validatedCredentials.email,
              password: validatedCredentials.password,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              errorData.detail ??
                errorData.message ??
                errorData.title ??
                "Login failed",
            );
          }

          const data = (await response.json()) as LoginResponse;
          const decoded = jwtDecode<DecodedToken>(data.accessToken);

          return {
            id: decoded.sub ?? validatedCredentials.email,
            email: validatedCredentials.email,
            name: decoded.name ?? validatedCredentials.email,
            role: data.role || decoded.role || "user",
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            // Use expiresIn (seconds from backend) — reliable source of truth
            accessTokenExpires: Date.now() + data.expiresIn * 1000,
          };
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Login failed";
          throw new Error(message);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in — user object only present on first call
      if (user) {
        const authUser = user as AuthorizeResponse;
        token.accessToken = authUser.accessToken;
        token.refreshToken = authUser.refreshToken;
        token.accessTokenExpires = authUser.accessTokenExpires;
        token.role = authUser.role;
        return token;
      }

      // Token still valid
      if (
        typeof token.accessTokenExpires === "number" &&
        Date.now() < token.accessTokenExpires
      ) {
        return token;
      }

      // Token expired — refresh
      return refreshAccessToken(token);
    },

    async session({ session, token }): Promise<Session> {
      session.user = {
        ...session.user,
        id: token.sub,
        role: token.role,
      };
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.accessTokenExpires = token.accessTokenExpires;
      session.error = token.error;
      return session;
    },

    async redirect({ url, baseUrl }): Promise<string> {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      try {
        if (new URL(url).origin === baseUrl) return url;
      } catch {
        // Invalid URL — fall through to baseUrl
      }
      return baseUrl;
    },
  },

  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    updateAge: 24 * 60 * 60, // Rotate every 24 hours
  },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  events: {
    async signOut({ token }) {
      // Notify backend to revoke the refresh token
      try {
        await fetch(`${API_BASE_URL}/api/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.accessToken ?? ""}`,
          },
          body: JSON.stringify({ refreshToken: token?.refreshToken }),
        });
      } catch (error) {
        console.error("Logout notification failed:", error);
      }
    },
  },
};

// ─── Token refresh helper ────────────────────────────────────────────────────

async function refreshAccessToken(token: import("next-auth/jwt").JWT) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: token.refreshToken }),
    });

    if (!response.ok) throw new Error("Refresh token failed");

    const data = (await response.json()) as RefreshTokenResponse;

    return {
      ...token,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      accessTokenExpires: Date.now() + data.expiresIn * 1000,
      error: undefined,
    };
  } catch (error) {
    console.error("Token refresh error:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
