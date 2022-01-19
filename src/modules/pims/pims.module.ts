import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CargosModule } from '../cargos/cargos.module';
import { MetasModule } from '../metas/metas.module';
import { PimLogsModule } from '../pim-logs/pim-logs.module';
import { PimsService } from './application/pims.service';
import { PimRepository } from './domain/pim.repository';
import { PimSubscriber } from './domain/pim.subscriber';
import { PimsController } from './infrastructure/pims.controller';

@Module({
  imports: [
    PimLogsModule,
    MetasModule,
    CargosModule,
    TypeOrmModule.forFeature([PimRepository]),
  ],
  providers: [
    PimsService,
    PimSubscriber
  ],
  controllers: [PimsController],
  exports: [PimsService],
})
export class PimsModule {}
