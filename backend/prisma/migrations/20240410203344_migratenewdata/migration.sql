/*
  Warnings:

  - A unique constraint covering the columns `[cep]` on the table `Escolas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[whatsapp]` on the table `Professores` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[whatsapp]` on the table `Responsavel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Responsavel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cep` to the `Escolas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Responsavel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Aluno" ADD COLUMN     "rg" TEXT;

-- AlterTable
ALTER TABLE "Escolas" ADD COLUMN     "cep" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Professores" ALTER COLUMN "whatsapp" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Responsavel" ADD COLUMN     "code" INTEGER NOT NULL,
ALTER COLUMN "whatsapp" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Escolas_cep_key" ON "Escolas"("cep");

-- CreateIndex
CREATE UNIQUE INDEX "Professores_whatsapp_key" ON "Professores"("whatsapp");

-- CreateIndex
CREATE UNIQUE INDEX "Responsavel_whatsapp_key" ON "Responsavel"("whatsapp");

-- CreateIndex
CREATE UNIQUE INDEX "Responsavel_code_key" ON "Responsavel"("code");
