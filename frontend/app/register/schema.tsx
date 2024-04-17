"use client";
import { z } from "zod";

export const schema = z.object({
  nome: z.string().min(3, "Nome Invalido").max(80), // nome 
  email: z.string().email({ message: "Email inválido" }), // validar email
  password: z.string(), // validar senha
  confirmpassword: z.string(), // validar senha
  whatsapp: z.string(),
}).refine(data => data.password === data.confirmpassword, {
  message: "As senhas não correspondem",
  path: ['confirmpassword'], // O caminho para o campo que deve receber o erro
});;
