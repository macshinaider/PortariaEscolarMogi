import { Request, Response } from "express";
import { prisma } from "../../../utils/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
					return res.status(200).json({
						message: "Login efetuado com sucesso",
						token: jwt.sign({ userId: Login.id }, "Lucas102030@", tokenexp),
					});
				}
			}
		} catch (error) {
			return res.status(500).json({ message: "Algum erro", error });
		}
	}
}

export default Account;

// describe("Account", () => {
// 	describe("Register", () => {
// 	  it("should create a new user", async () => {
// 		const req = {
// 		  body: {
// 			email: "test@example.com",
// 			nome: "Test User",
// 			password: "password",
// 			whatsapp: "1234567890",
// 		  },
// 		};
// 		const res = {
// 		  status: jest.fn().mockReturnThis(),
// 		  json: jest.fn(),
// 		};

// 		await Account.Register(req, res);

// 		expect(res.status).toHaveBeenCalledWith(201);
// 		expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
// 		  email: "test@example.com",
// 		  nome: "Test User",
// 		  whatsapp: "1234567890",
// 		}));
// 	  });

// 	  it("should return an error if the request body is missing", async () => {
// 		const req = {
// 		  body: {},
// 		};
// 		const res = {
// 		  status: jest.fn().mockReturnThis(),
// 		  json: jest.fn(),
// 		};

// 		await Account.Register(req, res);

// 		expect(res.status).toHaveBeenCalledWith(404);
// 		expect(res.json).toHaveBeenCalledWith({ message: "Dados Faltando" });
// 	  });
// 	});

// 	describe("Login", () => {
// 	  it("should return a user if the email is found", async () => {
// 		const req = {
// 		  body: {
// 			email: "test@example.com",
// 		  },
// 		};
// 		const res = {
// 		  status: jest.fn().mockReturnThis(),
// 		  json: jest.fn(),
// 		};

// 		await Account.Login(req, res);

// 		expect(res.status).toHaveBeenCalledWith(200);
// 		expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
// 		  email: "test@example.com",
// 		}));
// 	  });

// 	  it("should return an error if the email is not found", async () => {
// 		const req = {
// 		  body: {
// 			email: "notfound@example.com",
// 		  },
// 		};
// 		const res = {
// 		  status: jest.fn().mockReturnThis(),
// 		  json: jest.fn(),
// 		};

// 		await Account.Login(req, res);

// 		expect(res.status).toHaveBeenCalledWith(404);
// 		expect(res.json).toHaveBeenCalledWith({ message: "Usuário não encontrado" });
// 	  });
// 	});
//   });
