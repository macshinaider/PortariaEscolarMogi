import { Request, Response } from "express";
import { prisma } from "../../../utils/prisma";

class Consult {
	public static async Email(req: Request, res: Response) {
		try {
			const { email } = req.query;
			if (!email) {
				return res.status(404).json({ message: "Faltando o email na query" });
			}
			const consultar = await prisma.usuario.findUnique({
				where: {
					email: email?.toString(),
				},
			});
			if (!consultar) {
				return res.status(404).json({ message: "Usuário não encontrado" });
			} else {
				return res.status(200).json({ message: "Usuário encontrado" });
			}
		} catch (error) {
			return res.status(500).json({ message: error });
		}
	}

    public static async Whatsapp(req: Request, res: Response){
        try {
            
        } catch (error) {
            
        }
    }

    
}

export default Consult;
