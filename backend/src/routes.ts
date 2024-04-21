import express from "express";
import { Request, Response } from "express";
import StatusBackend from "./services/status/status";
import Consult from "./services/consult/get";
import Account from "./services/account/register/register";

class Router {
	router: any;
	constructor() {
		this.router = express.Router();
		this.initializeRoutes();
	}

	initializeRoutes() {
		this.router.get("/", this.index);
		this.router.get("/status", this.status);
		this.router.get("/verify/email/:email?", Consult.Email);

		// accounts
		this.router.post("/account/register", Account.Register);
		this.router.post("/account/login", Account.Login);
	}

	index(req: Request, res: Response) {
		res.send("Funcionando Perfeitamente");
	}

	status(req: Request, res: Response) {
		StatusBackend.Status(req, res);
	}
}

export default new Router().router;
