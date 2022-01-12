import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractsModule } from '../contracts/contracts.module';
import { InfoTypeAportationsModule } from '../info-type-aportations/info-type-aportations.module';
import { InfoTypeDiscountsModule } from '../info-type-discounts/info-type-discounts.module';
import { InfoTypeRemunerationsModule } from '../info-type-remunerations/info-type-remunerations.module';
import { InfosService } from './application/infos.service';
import { ProcessInfosService } from './application/process-infos.service';
import { InfoRepository } from './domain/info.repository';
import { InfoSubscriber } from './domain/info.subscriber';
import { InfosController } from './infrastructure/infos.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([InfoRepository]),
    InfoTypeRemunerationsModule,
    InfoTypeDiscountsModule,
    InfoTypeAportationsModule,
    forwardRef(() => ContractsModule),
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