import { Module } from '@nestjs/common';
import { HttpController } from './infrastructure/http.controller';
import { ReportGeneralService } from './application/report-general.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CronogramaRepository } from './domain/cronograma.repository';
import { CreateCronogramaService } from './application/create-cronograma.service';
import { CronogramaSubscriber } from './domain/cronograma.subscriber';
import { PlanillasModule } from '../planillas/planillas.module';
import { CronogramasService } from './application/cronogramas.service';
import { HistorialModule } from '../historial/historial.module';

@Module({
  imports: [
    HistorialModule,
    TypeOrmModule.forFeature([CronogramaRepository]),
    PlanillasModule
  ],
  providers: [
    CronogramasService,
    CreateCronogramaService, 
    ReportGeneralService,
    CronogramaSubscriber,
  ],
  controllers: [HttpController],
})
export class CronogramasModule {}
