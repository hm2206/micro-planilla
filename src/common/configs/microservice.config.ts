import { ClientsModule, ClientsModuleAsyncOptions, Transport } from '@nestjs/microservices';

export enum microserviceConfigName {
  SHIPPING_SERVICE = "SHIPPING_SERVICE"
}

export const MicroserviceConfig = ClientsModule.registerAsync([
  {
    name: microserviceConfigName.SHIPPING_SERVICE,
    useFactory: () => {
      return {
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`],
          queue: 'shipping'
        }
      }
    }
  }
] as ClientsModuleAsyncOptions) 