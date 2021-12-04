import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessInfosService } from './application/process-infos.service';
import { InfoRepository } from './domain/info.repository';

@Module({
  imports: [TypeOrmModule.forFeature([InfoRepository])],
  providers: [ProcessInfosService],
  exports: [ProcessInfosService],
})
export class InfoModule {}