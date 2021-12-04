import { MicroserviceOptions, Transport } from '@nestjs/microservices';
const { RABBITMQ_USER, RABBITMQ_PASS, RABBITMQ_HOST, RABBITMQ_PORT, RABBITMQ_VIRTUAL } = process.env;

export const SENT_MAIL = {
  transport: Transport.RMQ,
  options: {
    urls: [`amqp://${RABBITMQ_USER}:${RABBITMQ_PASS}@${RABBITMQ_HOST}:${RABBITMQ_PORT}/${RABBITMQ_VIRTUAL}`],
    queue: 'shipping',
    noAck: false
  }
} as MicroserviceOptions