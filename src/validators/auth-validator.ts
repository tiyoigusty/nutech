import { z } from "zod";

export const registerSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email({ message: "Paramter email tidak sesuai format" }),
  password: z.string().min(8, { message: "Password minimal 8 karakter" }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Paramter email tidak sesuai format" }),
  password: z.string().min(8, { message: "Password minimal 8 karakter" }),
});
