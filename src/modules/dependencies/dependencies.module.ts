import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DependencyRepository } from './domain/dependency.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DependencyRepository])],
})
export class DependenciesModule {}
