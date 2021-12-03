import { Module } from '@nestjs/common';
import { HttpController } from './infrastructure/http.controller';
import { ReportGeneralService } from './application/report-general.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CronogramaRepository } from './domain/cronograma.repository';
import { CreateCronogramaService } from './application/create-cronograma.service';
import { CronogramaSubscriber } from './domain/cronograma.subscriber';
import { PlanillasModule } from '../planillas/planillas.module';
import { MicroservicesModule } from '../microservices/microservices.module';

@Module({
  imports: [
    MicroservicesModule,
    TypeOrmModule.forFeature([CronogramaRepository]),
    PlanillasModule
  ],
  providers: [
    CreateCronogramaService, 
    ReportGeneralService,
    CronogramaSubscriber,
  ],
  controllers: [HttpController],
})
export class CronogramasModule {}
