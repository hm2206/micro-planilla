import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeCategoriesService } from './application/type-categories.service';
import { TypeCategoryRepository } from './domain/type-category.repository';
import { TypeCategoriesController } from './infrastructure/type-categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TypeCategoryRepository])],
  providers: [TypeCategoriesService],
  controllers: [TypeCategoriesController],
})
export class TypeCategoriesModule {}
