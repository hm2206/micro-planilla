import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeObligationRepository } from './domain/type-obligation.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TypeObligationRepository])],
})
export class TypeOblicationsModule {}
