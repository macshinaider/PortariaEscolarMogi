
import type { Metadata } from "next";
import { Inter, Rubik } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/utils/tanstack/provider";

const inter = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portaria Creche",
  description: "A segurança do seu filho em 1º lugar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}><QueryProvider>{children}</QueryProvider></body>
    </html>
  );
}
