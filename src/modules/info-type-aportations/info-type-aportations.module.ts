import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfoTypeAportationsService } from './application/info-type-aportations.service';
import { InfoTypeAportationRepository } from './domain/info-type-aportation.repository';
import { InfoTypeAportationsController } from './infrastructure/info-type-aportations.controller';

@Module({
  imports: [TypeOrmModule.forFeature([InfoTypeAportationRepository])],
  providers: [InfoTypeAportationsService],
  controllers: [InfoTypeAportationsController],
  exports: [InfoTypeAportationsService],
})
export class InfoTypeAportationsModule {}
