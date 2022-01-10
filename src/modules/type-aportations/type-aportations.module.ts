import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeAportationsService } from './application/type-aportations.service';
import { TypeAportationRepository } from './domain/type-aportation.repository';
import { TypeAportationsController } from './infrastructure/type-aportations.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TypeAportationRepository])],
  providers: [TypeAportationsService],
  controllers: [TypeAportationsController],
})
export class TypeAportationsModule {}
