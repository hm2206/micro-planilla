import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigTypeAportationRepository } from './domain/config-type-aportation.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ConfigTypeAportationRepository])],
})
export class ConfigTypeAportationsModule {}
