import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanillaRepository } from './domain/planilla.repository';
import { PlanillasService } from './application/planillas.service';
import { PlanillasController } from './infrastructure/planillas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PlanillaRepository])],
  providers: [PlanillasService],
  controllers: [PlanillasController],
  exports: [PlanillasService],
})
export class PlanillasModule {}