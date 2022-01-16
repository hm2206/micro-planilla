import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AportationsService } from './application/aportations.service';
import { AportationRepository } from './domain/aportation.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AportationRepository])],
  providers: [AportationsService],
  exports: [AportationsService],
})
export class AportationsModule {}
