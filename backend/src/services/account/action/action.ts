import { Message } from "amqplib";
import { Request, Response } from "express";
import { prisma } from "../../../utils/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Redis from "ioredis";
import Rabbit from "../../../libs/rabbitmq/enviar";
import { gerarPin } from "./gerarpin";

const redis = new Redis();
const fila = new Rabbit("code");

class Account {
	public static async Register(req: Request, res: Response) {
		try {
			const data = req.body;

			if (!data) {
				return res.status(404).json({ message: "Dados Faltando" });
			}

			const senhahash = await bcrypt.hash(data.password, 10);
			console.log("🚀 ~ Account ~ Register ~ senhahash:", senhahash);

			const cadastrar = await prisma.usuario.create({
				data: {
					email: data.email,
					nome: data.nome,
					password: senhahash,
					whatsapp: data.whatsapp,
				},
			});

			return res.status(201).json(cadastrar);
		} catch (error) {
			return res.status(500).json({ message: "Algum erro", error });
		}
	}

	public static async Login(req: Request, res: Response) {
		try {
			const data = req.body;
			if (!data) {
				return res.status(404).json({ message: "Dados Faltando" });
			}

			const Login = await prisma.usuario.findUnique({
				where: {
					email: data.email,
				},
			});

			const tokenexp = {
				expiresIn: "7d",
			};

			if (!Login) {
				return res.status(404).json({ message: "Usuário não encontrado" });
			} else {
				const verificar = await bcrypt.compare(data.password, Login.password);
				if (!verificar) {
					return res.status(401).json({ message: "Senha incorreta" });
				} else {
					const token = jwt.sign(
						{ userId: Login.id },
						"Lucas102030@",
						tokenexp
					);

					return res.status(200).json({
						message: "Login efetuado com sucesso!",
						token: token,
					});
				}
			}
		} catch (error) {
			return res.status(500).json({ message: "Algum erro", error });
		}
	}

	public static async Code(req: Request, res: Response) {
		try {
			const token = req.cookies.token;
			console.log("🚀 ~ Account ~ Code ~ token:", token);
			if (!token) {
				return res.status(404).json({ message: "Token não encontrado" });
			}
			const iduser = jwt.verify(token, "Lucas102030@");

			if (typeof iduser === "object" && "userId" in iduser) {
				const id = iduser.userId;
				console.log("🚀 ~ Account ~ Code ~ id:", id);

				const pin = gerarPin();
				const enviarfila = fila.enviarFila(JSON.stringify({ id, pin }));
				const redisid = await redis.set(id, pin, "EX", 300);
				console.log("🚀 ~ Account ~ Code ~ redisid:", redisid);
				return res.status(200).json({ message: "Enviado com sucesso" });
			} else {
				return res.status(500).json({ message: "Token inválido" });
			}
		} catch (error) {
			return res.status(500).json({ message: "Algum erro", error });
		}
	}

	public static async getCode(req: Request, res: Response) {
		try {
			if (!req.cookies.token) {
				return res.status(404).json({ message: "PIN não encontrado" });
			}
			const token = req.cookies.token;
			console.log("🚀 ~ Account ~ getCode ~ token:", token);
			const iduser = jwt.verify(token, "Lucas102030@");

			if (typeof iduser === "object" && "userId" in iduser) {
				const id = iduser.userId;
				const pin = await redis.get(id);
				if (!pin) {
					return res.status(404).json({ message: "PIN não encontrado" });
				}
				return res.status(200).json({ message: "PIN encontrado", pin });
			}
		} catch (error) {
			return res.status(500).json({ message: "Algum erro", error });
		}
	}
}

export default Account;
