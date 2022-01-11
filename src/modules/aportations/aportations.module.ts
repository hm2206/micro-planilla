import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AportationRepository } from './domain/aportation.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AportationRepository])]
})
export class AportationsModule {}
