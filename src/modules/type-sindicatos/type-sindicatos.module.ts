import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeSindicatoRepository } from './domain/type-sindicato.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TypeSindicatoRepository])],
})
export class TypeSindicatosModule {}
