import { Request, Response } from "express";

interface StatusData {
	Testando: string;
}

class StatusBackend {
	public static async Status(req: Request, res: Response) {
		res.status(200).send("Funcionando")
	}
}

export default StatusBackend;
