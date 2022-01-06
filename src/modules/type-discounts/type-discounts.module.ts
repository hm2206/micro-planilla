import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeDiscountRepository } from './domain/type-discount.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TypeDiscountRepository])],
})
export class TypeDiscountsModule {}
