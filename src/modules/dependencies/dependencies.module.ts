import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DependenciesService } from './application/dependencies.service';
import { DependencyRepository } from './domain/dependency.repository';
import { DependenciesController } from './infrastructure/dependencies.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DependencyRepository])],
  providers: [DependenciesService],
  controllers: [DependenciesController],
})
export class DependenciesModule {}
