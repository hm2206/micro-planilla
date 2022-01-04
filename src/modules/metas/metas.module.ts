import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaRepository } from './domain/meta.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MetaRepository])],
})
export class MetasModule {}
