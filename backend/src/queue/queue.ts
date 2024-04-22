import { QueueConsumer } from "../libs/rabbitmq/receber";

class Queue {
	queue: any;
	constructor() {
		this.queue = QueueConsumer;
		this.code();
	}

	async code() {
		const queueConsumer = await this.queue.create("code");
		queueConsumer.startConsumer((content: any, message: any) => {				
            queueConsumer.channel.ack(message)

		});
	}
    
}

export default new Queue().queue;
