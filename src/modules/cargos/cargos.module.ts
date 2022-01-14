import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CargosService } from './application/cargos.service';
import { CargoRepository } from './domain/cargo.repository';
import { CargosController } from './infrastructure/cargos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CargoRepository])],
  providers: [CargosService],
  controllers: [CargosController],
  exports: [CargosService],
})
export class CargosModule {}
