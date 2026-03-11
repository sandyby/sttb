import {
  useSession,
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
} from "next-auth/react";
import { useCallback } from "react";

export interface UseAuthReturn {
  user:
    | ({
        id?: string;
        role?: string;
      } & {
        email?: string | null;
        name?: string | null;
        image?: string | null;
      })
    | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error?: string | null;
}

/**
 * Hook for authentication state and operations
 * Wraps next-auth/react useSession with additional helpers
 */
export function useAuth(): UseAuthReturn {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const user = session?.user || null;
  const isAdmin = user?.role === "Admin" || user?.role === "admin";

  const login = useCallback(async (email: string, password: string) => {
    const result = await nextAuthSignIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!result?.ok) {
      throw new Error(result?.error || "Login failed");
    }
  }, []);

  const logout = useCallback(async () => {
    await nextAuthSignOut({
      redirect: true,
      callbackUrl: "/admin/login",
    });
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated,
    isAdmin,
    login,
    logout,
  };
}
