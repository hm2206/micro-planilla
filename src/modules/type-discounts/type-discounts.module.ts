import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeDiscountsService } from './application/type-discounts.service';
import { TypeDiscountRepository } from './domain/type-discount.repository';
import { TypeDiscountsController } from './infrastructure/type-discounts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TypeDiscountRepository])],
  providers: [TypeDiscountsService],
  controllers: [TypeDiscountsController],
})
export class TypeDiscountsModule {}
