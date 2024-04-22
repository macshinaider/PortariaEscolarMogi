import connectRabbitMQ from "./rabbitmqserver";

export default class Rabbit {
	fila: string;
	channel: any;

	constructor(fila: string) {
		this.fila = fila;
	}

	async connect() {
		this.channel = await connectRabbitMQ();
		this.channel.assertQueue(this.fila, { durable: true });
	}

	async enviarFila(msg: any) {
		try {
			if (!this.channel) {
				await this.connect();
			}

			const dados = JSON.stringify(msg);

			// Verifique se a mensagem foi enviada corretamente
			const sent = this.channel.sendToQueue(this.fila, Buffer.from(dados));

			if (sent) {
				console.log(`Mensagem enviada: ${msg}`);
			} else {
				console.log("Falha ao enviar a mensagem");
				// Você pode escolher lidar com a falha aqui
			}
		} catch (error) {
			console.log(error);
		}
	}
}
