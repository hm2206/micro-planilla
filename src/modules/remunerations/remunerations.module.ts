import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RemunerationsService } from './application/remunerations.service';
import { RemunerationRepository } from './domain/remuneration.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RemunerationRepository])],
  providers: [RemunerationsService],
  exports: [RemunerationsService],
})
export class RemunerationsModule {}
