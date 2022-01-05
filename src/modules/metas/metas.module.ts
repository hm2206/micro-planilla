import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetasService } from './application/metas.service';
import { MetaRepository } from './domain/meta.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MetaRepository])],
  providers: [MetasService],
  exports: [MetasService],
})
export class MetasModule {}
