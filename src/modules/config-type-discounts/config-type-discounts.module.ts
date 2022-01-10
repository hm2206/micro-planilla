import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigTypeDiscountRepository } from './domain/config-type-discount.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ConfigTypeDiscountRepository])],
})
export class ConfigTypeDiscountsModule {}
