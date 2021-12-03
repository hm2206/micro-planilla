import { Module } from '@nestjs/common';
import { ShippingService } from './shipping/shipping.service';
import { MicroserviceConfig } from '../../common/configs/microservice.config';

@Module({
  imports: [MicroserviceConfig],
  providers: [ShippingService],
  exports: [ShippingService],
})
export class MicroservicesModule {}