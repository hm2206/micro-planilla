import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RemunerationEntity } from './domain/remuneration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RemunerationEntity])],
})
export class RemunerationsModule {}
