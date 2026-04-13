import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "Pelo menos 6 caracteres" }),
});
