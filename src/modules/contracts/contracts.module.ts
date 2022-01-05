import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractsService } from './application/contracts.service';
import { ContractRepository } from './domain/contract.repository';
import { ContractsController } from './infrastructure/contracts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ContractRepository])],
  providers: [ContractsService],
  controllers: [ContractsController],
})
export class ContractsModule {}
