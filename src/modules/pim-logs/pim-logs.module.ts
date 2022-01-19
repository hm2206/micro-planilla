import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from '../files/files.module';
import { PimsModule } from '../pims/pims.module';
import { CreatePimLogsService } from './application/create-pim.logs.service';
import { PimLogsService } from './application/pim-logs.service';
import { PimLogRepository } from './domain/pim-log.repository';
import { PimLogSubscriber } from './domain/pim-log.subscriber';
import { PimLogsController } from './infrastructure/pim-logs.controller';

@Module({
  imports: [
    forwardRef(() => PimsModule),
    FilesModule,
    TypeOrmModule.forFeature([PimLogRepository])
  ],
  providers: [
    CreatePimLogsService,
    PimLogsService,
    PimLogSubscriber,
  ],
  controllers: [PimLogsController],
  exports: [
    PimLogsService,
    CreatePimLogsService,
  ],
})
export class PimLogsModule {}
