import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CargoRepository } from './domain/cargo.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CargoRepository])],
})
export class CargosModule {}
