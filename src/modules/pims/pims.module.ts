import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PimsService } from './application/pims.service';
import { PimRepository } from './domain/pim.repository';
import { PimSubscriber } from './domain/pim.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([PimRepository])],
  providers: [
    PimsService,
    PimSubscriber
  ],
  exports: [PimsService],
})
export class PimsModule {}
