import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AfpsService } from './application/afps.service';
import { AfpRepository } from './domain/afp.repository';
import { AfpsController } from './infrastructure/afps.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AfpRepository])],
  providers: [AfpsService],
  controllers: [AfpsController],
})
export class AfpsModule {}
