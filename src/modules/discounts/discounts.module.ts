import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountRepository } from './domain/discount.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DiscountRepository])],
})
export class DiscountsModule {}
