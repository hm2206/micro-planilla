import { Module } from '@nestjs/common';
import { CronogramasController } from './infrastructure/cronogramas.controller';
import { CronogramasReportController } from './infrastructure/crongoramas-report.controller';
import { ReportGeneralService } from './application/report-general.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CronogramaRepository } from './domain/cronograma.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CronogramaRepository]),
  ],
  providers: [
    ReportGeneralService,
  ],
  controllers: [
    CronogramasController, 
    CronogramasReportController
  ],
})
export class CronogramasModule {}
