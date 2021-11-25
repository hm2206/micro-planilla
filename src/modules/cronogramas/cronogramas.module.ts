import { Module } from '@nestjs/common';
import { HttpController } from './infrastructure/http.controller';
import { ReportGeneralService } from './application/report-general.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CronogramaRepository } from './domain/cronograma.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CronogramaRepository]),
  ],
  providers: [ReportGeneralService,],
  controllers: [HttpController],
})
export class CronogramasModule {}
