-- CreateTable
CREATE TABLE "Aluno" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "escolasId" INTEGER,
    "salaId" INTEGER,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Escolas" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "lougradouro" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "usuarioId" INTEGER,

    CONSTRAINT "Escolas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Professores" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "escolasId" INTEGER,

    CONSTRAINT "Professores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registrologs" (
    "id" SERIAL NOT NULL,
    "DHEntrada" TEXT NOT NULL,
    "DHSaida" TEXT NOT NULL,
    "alunoId" INTEGER,
    "responsavelId" INTEGER,

    CONSTRAINT "Registrologs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Responsavel" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "alunoId" INTEGER,

    CONSTRAINT "Responsavel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sala" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "escolasId" INTEGER,

    CONSTRAINT "Sala_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_id_key" ON "Aluno"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Escolas_id_key" ON "Escolas"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Professores_id_key" ON "Professores"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Registrologs_id_key" ON "Registrologs"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Responsavel_id_key" ON "Responsavel"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Sala_id_key" ON "Sala"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_id_key" ON "Usuario"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_whatsapp_key" ON "Usuario"("whatsapp");

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_escolasId_fkey" FOREIGN KEY ("escolasId") REFERENCES "Escolas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_salaId_fkey" FOREIGN KEY ("salaId") REFERENCES "Sala"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escolas" ADD CONSTRAINT "Escolas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Professores" ADD CONSTRAINT "Professores_escolasId_fkey" FOREIGN KEY ("escolasId") REFERENCES "Escolas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registrologs" ADD CONSTRAINT "Registrologs_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registrologs" ADD CONSTRAINT "Registrologs_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES "Responsavel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Responsavel" ADD CONSTRAINT "Responsavel_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sala" ADD CONSTRAINT "Sala_escolasId_fkey" FOREIGN KEY ("escolasId") REFERENCES "Escolas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
