import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeCargosService } from './application/type-cargos.service';
import { TypeCargoRepository } from './domain/type-cargo.repository';
import { TypeCargosController } from './infrastructure/type-cargos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TypeCargoRepository])],
  providers: [TypeCargosService],
  controllers: [TypeCargosController],
})
export class TypeCargosModule {}
