import { Module } from '@nestjs/common';
import { HttpController } from './infrastructure/http.controller';
import { ReportGeneralService } from './application/report-general.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CronogramaRepository } from './domain/cronograma.repository';
import { CronogramasService } from './application/cronogramas.service';
import { CronogramaSubscriber } from './domain/cronograma.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([CronogramaRepository]),
  ],
  providers: [
    CronogramasService, 
    ReportGeneralService,
    CronogramaSubscriber,
  ],
  controllers: [HttpController],
})
export class CronogramasModule {}
