import express from "express";
import swaggerUi from "swagger-ui-express";
import { Server, createServer } from "http";
import configureSocket from "./socket.io/socket";
import router from "./routes";
import swaggerDocs from "./swagger.json";
import bodyParser from "body-parser";

export class App {
	public app: express.Application;
	public server: Server;

	constructor() {
		this.app = express();
		this.app.use((req, res, next) => {
			res.header("Access-Control-Allow-Origin", "*");
			res.header(
				"Access-Control-Allow-Headers",
				"Origin, X-Requested-With, Content-Type, Accept"
			);
			next();
		});
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(express.json());
		this.server = createServer(this.app);
		this.app.use(router);
		// configureSocket(this.server);
		this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
	}
}
