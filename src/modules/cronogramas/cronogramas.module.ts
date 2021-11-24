import { Module } from '@nestjs/common';
import { CronogramasController } from './infrastructure/cronogramas.controller';
import { CronogramasReportController } from './infrastructure/crongoramas-report.controller';

@Module({
  controllers: [
    CronogramasController, 
    CronogramasReportController
  ],
})
export class CronogramasModule {}
