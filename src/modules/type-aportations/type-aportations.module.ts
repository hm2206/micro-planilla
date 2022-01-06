import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeAportationRepository } from './domain/type-aportation.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TypeAportationRepository])],
})
export class TypeAportationsModule {}
