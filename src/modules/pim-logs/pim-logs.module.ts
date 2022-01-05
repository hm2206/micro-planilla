import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PimLogsService } from './application/pim-logs.service';
import { PimLogRepository } from './domain/pim-log.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PimLogRepository])],
  providers: [PimLogsService],
  exports: [PimLogsService],
})
export class PimLogsModule {}
