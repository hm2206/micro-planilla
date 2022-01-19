import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeAffiliationRepository } from './domain/type-affiliation.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TypeAffiliationRepository])],
})
export class TypeAffiliationsModule {}
