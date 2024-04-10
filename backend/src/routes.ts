import express from "express";
import { Request, Response } from "express";
import StatusBackend from "./services/status/status";

const router = express.Router();

router.get("/", (req, res) => {
	res.send("Funcionando Perfeitamente");
});

router.get("/status", StatusBackend.Status);

export default router;
