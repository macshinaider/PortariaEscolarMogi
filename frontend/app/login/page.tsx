"use client";
import { useQuery } from "react-query";
import { fetchStatus } from "./fetch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schemaLogin = z.object({
  nome: z.string().min(3, "Nome Invalido").max(80), // nome 
  email: z.string().email({ message: "Email inválido" }), // validar email
  password: z.string(), // validar senha
  confirmpassword: z.string(), // validar senha
  whatsapp: z.string(),
}).refine(data => data.password === data.confirmpassword, {
  message: "As senhas não correspondem",
  path: ['confirmpassword'], // O caminho para o campo que deve receber o erro
});;



export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaLogin),
  });


  const { data, isLoading, isError } = useQuery("status", fetchStatus, {
    refetchInterval: 5000, 
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Seu Backend esta Offline</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className=" text-">Login</h1>
      <form></form>
    </div>
  );
}
