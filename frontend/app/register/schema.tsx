"use client";
import { z } from "zod";

export const schema = z.object({
  nome: z.string().min(3, "Nome Invalido").max(80),
  email: z
    .string()
    .email({ message: "Email inválido" })
    .refine(async (res) => {}),
  password: z.string(),
  confirmpassword: z.string(),
  whatsapp: z.string(),
});
