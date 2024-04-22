"use client";
import { useQuery } from "react-query";
import { fetchLogin, fetchStatus } from "./fetch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTheme } from "next-themes";
import Link from "next/link";
import Cookie from "js-cookie";
import { useToast } from "@/components/ui/use-toast";
import { toast } from "react-toastify";

const schemaLogin = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string(),
});

export default function LoginPage() {
  const { theme } = useTheme();

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

  function onSubmit(data: any) {
    fetchLogin(data).then((res) => {
      if (!res) {
        toast.error("Email ou senha incorretos");
        return false;
      }
      toast.success("Logado com sucesso");

      Cookie.set("token", res.token);
      setTimeout(() => {
        window.location.href = "/code";
      }, 5000);
    });
  }

  function RedirectLogin() {
    window.location.href = "/register";
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-10">
      <h1 className="text-3xl font-bold">Login Sistema</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between gap-2 "
      >
        <div className="flex gap-3 p-1 items-center justify-between">
          <label className="italic font-medium">Email:</label>
          <input
            {...register("email")}
            className={`flex rounded h-8 p-1 border-2 ${
              theme === "dark"
                ? "bg-zinc-800 text-white focus:bg-white focus:text-black"
                : "bg-white text-black focus:bg-zinc-800 focus:text-white"
            }`}
          />
          {errors.email && <p>{errors.email.message?.toString()}</p>}
        </div>
        <div className="flex gap-3 p-1 items-center justify-between">
          <label className="italic font-medium">Senha:</label>
          <input
            {...register("password")}
            type="password"
            className={`flex rounded h-8 p-1 border-2 ${
              theme === "dark"
                ? "bg-zinc-800 text-white focus:bg-white focus:text-black"
                : "bg-white text-black focus:bg-zinc-800 focus:text-white"
            }`}
          />
          {errors.password && <p>{errors.password.message?.toString()}</p>}
        </div>
        <div className="flex gap-1 p-1 items-center justify-between">
          <button
            type="submit"
            className="flex bg-emerald-500 items-center justify-center text-white rounded p-2 w-32"
          >
            Entrar
          </button>
          <Link
            href="/register"
            className="flex bg-blue-500 items-center justify-center text-white rounded p-2 w-32"
          >
            Criar Conta
          </Link>
        </div>
      </form>
    </div>
  );
}
