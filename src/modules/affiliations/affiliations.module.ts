import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AffiliationsService } from './application/affiliations.service';
import { AffiliationRepository } from './domain/affiliation.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AffiliationRepository])],
  providers: [AffiliationsService],
  exports: [AffiliationsService],
})
export class AffiliationsModule {}
