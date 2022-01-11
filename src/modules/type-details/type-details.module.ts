import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeDetailRepository } from './domain/type-detail.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TypeDetailRepository])],
})
export class TypeDetailsModule {}
