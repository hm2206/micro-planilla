import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfoTypeRemunerationsService } from './application/info-type-remunerations.service';
import { InfoTypeRemunerationRepository } from './domain/info-type-remuneration.repository';
import { InfoTypeRemunerationsController } from './infrastructure/info-type-remunerations.controller';

@Module({
  imports: [TypeOrmModule.forFeature([InfoTypeRemunerationRepository])],
  providers: [InfoTypeRemunerationsService],
  controllers: [InfoTypeRemunerationsController],
  exports: [InfoTypeRemunerationsService],
})
export class InfoTypeRemunerationsModule {}
