import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PimLogRepository } from './domain/pim-log.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PimLogRepository])],
})
export class PimLogsModule {}
