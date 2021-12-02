import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanillaRepository } from './domain/planilla.repository';
import { PlanillasService } from './application/planillas.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlanillaRepository])],
  providers: [PlanillasService],
  exports: [PlanillasService],
})
export class PlanillasModule {}