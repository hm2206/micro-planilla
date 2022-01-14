import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetasService } from './application/metas.service';
import { MetaRepository } from './domain/meta.repository';
import { MetasController } from './infrastructure/metas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MetaRepository])],
  providers: [MetasService],
  controllers: [MetasController],
  exports: [MetasService],
})
export class MetasModule {}
