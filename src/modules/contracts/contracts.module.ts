import { Module, forwardRef} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfoModule } from '../infos/infos.module';
import { WorksModule } from '../works/works.module';
import { ContractsService } from './application/contracts.service';
import { ContractRepository } from './domain/contract.repository';
import { ContractSubscriber } from './domain/contract.subscriber';
import { ContractsController } from './infrastructure/contracts.controller';

@Module({
  imports: [
    WorksModule,
    forwardRef(() => InfoModule),
    TypeOrmModule.forFeature([ContractRepository]),
  ],
  providers: [
    ContractsService,
    ContractSubscriber
  ],
  controllers: [ContractsController],
  exports: [ContractsService],
})
export class ContractsModule {}
