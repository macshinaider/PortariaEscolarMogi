"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function Register() {
  const { theme } = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-5 h-screen justify-center">
      <div className="mb-6">
        <h1 className="flex text-3xl font-bold justify-center items-center">
          Cadastro Portaria Creche
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center p-2 w-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-between gap-5"
        >
          <div className="flex gap-3 p-1 items-center justify-between">
            <label className="italic font-medium">Nome:</label>
            <input
              {...register("nome")}
              className={`flex rounded h-8 p-1 border-2 ${
                theme === "dark"
                  ? "bg-zinc-800 text-white focus:bg-white focus:text-black"
                  : "bg-white text-black focus:bg-zinc-800 focus:text-white"
              }`}
            />
            {errors.nome && <p>{errors.nome.message?.toString()}</p>}
          </div>

          <div className="flex gap-3 p-1 items-center justify-between">
            <label className="italic font-medium">Email:</label>
            <input
              {...register("email", { required: true })}
              className={`flex rounded h-8 p-1 border-2 ${
                theme === "dark"
                  ? "bg-zinc-800 text-white"
                  : "bg-white text-black"
              }`}
            />
            {errors.email && <p>{errors.email.message?.toString()}</p>}
          </div>
          <div className="flex gap-3 p-1 items-center justify-between">
            <label className="italic font-medium">Senha:</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className={`flex rounded h-8 p-1 border-2 ${
                theme === "dark"
                  ? "bg-zinc-800 text-white"
                  : "bg-white text-black"
              }`}
            />
            {errors.password && <p>{errors.password.message?.toString()}</p>}
          </div>
          <div className="flex gap-3 p-1 items-center justify-between">
            <label className="italic font-medium">Confirmar Senha:</label>
            <input
              type="password"
              {...register("confirmpassword", { required: true })}
              className={`flex rounded h-8 p-1 border-2 ${
                theme === "dark"
                  ? "bg-zinc-800 text-white"
                  : "bg-white text-black"
              }`}
            />
            {errors.confirmpassword && (
              <p>{errors.confirmpassword.message?.toString()}</p>
            )}
          </div>
          <div className="flex gap-3 p-1 items-center justify-between">
            <label className="italic font-medium">Whatsapp:</label>
            <input
              type="text"
              {...register("whatsapp", { required: true })}
              className={`flex rounded h-8 p-1 border-2 ${
                theme === "dark"
                  ? "bg-zinc-800 text-white"
                  : "bg-white text-black"
              }`}
            />
            {errors.whatsapp && <p>{errors.whatsapp.message?.toString()}</p>}
          </div>
          <div className="flex gap-2 items-center justify-center">
            <button
              type="submit"
              className="flex items-center rounded mt-6 bg-emerald-500 p-4 h-8 text-white"
            >
              Cadastrar
            </button>
            <Link
              href="/login"
              className="flex items-center rounded mt-6 bg-blue-500 p-4 h-8 text-white"
            >
              Fazer Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
