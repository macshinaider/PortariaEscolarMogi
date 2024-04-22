import { connect, Channel, Connection } from "amqplib";

export class QueueConsumer {
	queueName: string;
	channel: Channel;
	connection: Connection;

	private constructor(
		queueName: string,
		channel: Channel,
		connection: Connection
	) {
		this.queueName = queueName;
		this.channel = channel;
		this.connection = connection;
	}

	static async create(queueName: string) {
		const connection = await connect(process.env.HOST_RABBITMQ!);
		const channel = await connection.createChannel();
		await channel.assertQueue(queueName, { durable: true });
		return new QueueConsumer(queueName, channel, connection);
	}

	async startConsumer(callback: (content: string, message: any) => void) {
		console.log(`ouvindo ${this.queueName}`);

		this.channel.consume(this.queueName, async (message) => {
			if (message) {
				const content = message.content.toString();
				console.log(`Mensagem recebida: ${JSON.parse(content)}`);
				try {
					callback(JSON.parse(content), message);
				} catch (error) {
					console.error("Erro ao processar a mensagem:", error);
					setTimeout(() => {
						this.channel.nack(message, false, true);
					}, 2 * 60 * 1000);
				}
			}
		});
	}
}
