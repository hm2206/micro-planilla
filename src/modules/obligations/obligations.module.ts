import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOblicationsModule } from '../type-oblications/type-oblications.module';
import { ObligationsService } from './application/obligations.service';
import { ObligationRepository } from './domain/obligation.repository';

@Module({
  imports: [
    TypeOblicationsModule,
    TypeOrmModule.forFeature([ObligationRepository])
  ],
  providers: [ObligationsService],
  exports: [ObligationsService],
})
export class ObligationsModule {}
