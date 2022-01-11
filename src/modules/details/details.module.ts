import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailRepository } from './domain/detail.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DetailRepository])],
})
export class DetailsModule {}
