import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PimRepository } from './domain/pim.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PimRepository])],
})
export class PimsModule {}
