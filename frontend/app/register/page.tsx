"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";

export default function Register() {
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
    <div className="flex flex-col">
      <div className="mb-6">
        <h1 className="flex flex-col font-sans text-xl items-center justify-center">
          Cadastro Sistema Portaria Creche
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center p-2 w-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-between"
        >
          <div className="flex gap-3 p-1 items-center justify-between">
            <label className="italic font-medium">Nome:</label>
            <input
              {...register("nome")}
              className="flex rounded bg-zinc-800 border-white h-8 p-1"
            />
            {errors.nome && <p>{errors.nome.message?.toString()}</p>}
          </div>

          <div className="flex gap-3 p-1 items-center justify-between">
            <label className="italic font-medium">Email:</label>
            <input
              {...register("email", { required: true })}
              className="flex rounded bg-zinc-800 border-white h-8 p-1"
            />
            {errors.email && <p>{errors.email.message?.toString()}</p>}
          </div>
          <div className="flex gap-3 p-1 items-center justify-between">
            <label className="italic font-medium">Senha:</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="flex rounded bg-zinc-800 border-white h-8 p-1"
            />
            {errors.password && <p>{errors.password.message?.toString()}</p>}
          </div>
          <div className="flex gap-3 p-1 items-center justify-between">
            <label className="italic font-medium">Confirmar Senha:</label>
            <input
              type="password"
              {...register("passwordConfirm", { required: true })}
              className="flex rounded bg-zinc-800 border-white h-8 p-1"
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
              className="flex rounded bg-zinc-800 border-white h-8 p-1"
            />
            {errors.whatsapp && <p>{errors.whatsapp.message?.toString()}</p>}
          </div>
        </form>
        <button
          type="submit"
          className="flex items-center rounded mt-6 bg-emerald-500 p-4 h-8"
        >
          Cadastrar
        </button>
      </div>
    </div>
  );
}
