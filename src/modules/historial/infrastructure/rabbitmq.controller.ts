import { Controller } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { HistorialService } from '../application/historial.service';

@Controller()
export class RabbitMqController {
  constructor(private historialService: HistorialService) {}

  @EventPattern('sendMailPlanilla')
  public async sendMail(@Payload() payload: any, @Ctx() context: RmqContext): Promise<void> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    const data = { sendEmail: true };
    await this.historialService.update(payload, data as any);
    channel.ack(originalMsg);
  }
}