import { object, string } from "zod";

export const loginSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "E-mail is required")
    .email("Invalid E-mail!"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long!")
    .max(32, "Password must be less than 32 characters long!"),
});
