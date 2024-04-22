import { Channel, connect } from "amqplib";

const rabbit = process.env.HOST_RABBITMQ;

async function connectRabbitMQ(): Promise<Channel> {
  try {
    const connection = await connect(rabbit!);
    const channel = await connection.createChannel();
    return channel;
  } catch (error) {
    console.error("Erro ao conectar ao RabbitMQ:", error);
    throw error;
  }
}

export default connectRabbitMQ;