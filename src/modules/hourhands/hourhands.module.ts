import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HourhandsService } from './application/hourhands.service';
import { HourhandRepository } from './domain/hourhand.repository';
import { HourhandsController } from './infrastructure/hourhands.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HourhandRepository])],
  providers: [HourhandsService],
  controllers: [HourhandsController],
})
export class HourhandsModule {}
