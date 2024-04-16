import { Request, Response } from "express";

interface StatusData {
	Testando: string;
}


class StatusBackend {

	public static async Status(req: Request, res: Response) {
		const status = process.env.NODE_ENV
		console.log("🚀 ~ StatusBackend ~ Status ~ status:", status)
		res.status(200).send(status)
	}
}

export default StatusBackend;
