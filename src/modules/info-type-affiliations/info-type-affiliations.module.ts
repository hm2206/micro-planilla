import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfoTypeAffiliationsService } from './application/info-type-affiliations.service';
import { InfoTypeAffiliationRepository } from './domain/info-type-affiliation.repository';

@Module({
  imports: [TypeOrmModule.forFeature([InfoTypeAffiliationRepository])],
  providers: [InfoTypeAffiliationsService],
  exports: [InfoTypeAffiliationsService],
})
export class InfoTypeAffiliationsModule {}
