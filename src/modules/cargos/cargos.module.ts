import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CargosService } from './application/cargos.service';
import { CargoRepository } from './domain/cargo.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CargoRepository])],
  providers: [CargosService],
  exports: [CargosService],
})
export class CargosModule {}
