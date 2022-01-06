import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeDetalleRepository } from './domain/type-detalle.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TypeDetalleRepository])],
})
export class TypeDetallesModule {}
