import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PimsModule } from '../pims/pims.module';
import { PimLogsService } from './application/pim-logs.service';
import { PimLogRepository } from './domain/pim-log.repository';
import { PimLogSubscriber } from './domain/pim-log.subscriber';
import { PimLogsController } from './infrastructure/pim-logs.controller';

@Module({
  imports: [
    forwardRef(() => PimsModule),
    TypeOrmModule.forFeature([PimLogRepository])
  ],
  providers: [
    PimLogsService,
    PimLogSubscriber,
  ],
  controllers: [PimLogsController],
  exports: [PimLogsService],
})
export class PimLogsModule {}
