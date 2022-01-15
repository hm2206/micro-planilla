import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountsService } from './application/discounts.service';
import { DiscountRepository } from './domain/discount.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DiscountRepository])],
  providers: [DiscountsService],
  exports: [DiscountsService],
})
export class DiscountsModule {}
