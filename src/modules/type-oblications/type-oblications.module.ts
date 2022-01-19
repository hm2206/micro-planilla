import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientHttpModule } from 'src/client-http/client-http.module';
import { TypeObligationsService } from './application/type-obligations.service';
import { TypeObligationRepository } from './domain/type-obligation.repository';

@Module({
  imports: [
    ClientHttpModule,
    TypeOrmModule.forFeature([TypeObligationRepository])
  ],
  providers: [TypeObligationsService],
  exports: [TypeObligationsService],
})
export class TypeOblicationsModule {}
