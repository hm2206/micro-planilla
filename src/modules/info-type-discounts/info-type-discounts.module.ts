import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfoTypeDiscountsService } from './application/info-type-discounts.service';
import { InfoTypeDiscountRepository } from './domain/info-type-discount.repository';
import { InfoTypeDiscountsController } from './infrastructure/info-type-discounts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([InfoTypeDiscountRepository])],
  providers: [InfoTypeDiscountsService],
  controllers: [InfoTypeDiscountsController],
  exports: [InfoTypeDiscountsService],
})
export class InfoTypeDiscountsModule {}
