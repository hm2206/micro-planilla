import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { HistorialService } from '../application/historial.service';

@Controller()
export class RabbitMqController {
  constructor(private historialService: HistorialService) {}

  @MessagePattern('sendMailProcess')
  public async sendMail(@Payload() payload: any, @Ctx() context: RmqContext): Promise<void> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    // process
    try {
      const data = { sendEmail: true };
      await this.historialService.editHistorial(payload, data as any);
      channel.ack(originalMsg);
    } catch (error) {
      channel.ack(originalMsg);
    }
  }
}