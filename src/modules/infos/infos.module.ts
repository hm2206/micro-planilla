import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractsModule } from '../contracts/contracts.module';
import { InfosService } from './application/infos.service';
import { ProcessInfosService } from './application/process-infos.service';
import { InfoRepository } from './domain/info.repository';
import { InfoSubscriber } from './domain/info.subscriber';
import { InfosController } from './infrastructure/infos.controller';

@Module({
  imports: [
    ContractsModule,
    TypeOrmModule.forFeature([InfoRepository])
  ],
  providers: [
    ProcessInfosService,
    InfosService,
    InfoSubscriber
  ],
  controllers: [InfosController],
  exports: [
    ProcessInfosService,
    InfosService,
  ],
})
export class InfoModule {}