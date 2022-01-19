import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessTypeRemuneracionService } from './application/process-type-remuneracion.service';
import { TypeRemunerationsService } from './application/type-remunerations.service';
import { TypeRemunerationRepository } from './domain/type-remuneration.repository';
import { HttpTypeRemuneracionController } from './infrastructure/http-type-remuneracion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TypeRemunerationRepository])],
  providers: [
    TypeRemunerationsService,
    ProcessTypeRemuneracionService
  ],
  controllers: [HttpTypeRemuneracionController],
})
export class TypeRemunerationsModule {}
