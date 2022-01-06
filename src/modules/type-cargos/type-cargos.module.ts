import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeCargoRepository } from './domain/type-cargo.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TypeCargoRepository])],
})
export class TypeCargosModule {}
