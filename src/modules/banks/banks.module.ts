import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BanksService } from './application/banks.service';
import { BankRepository } from './domain/bank.repository';
import { BanksController } from './infrastructure/banks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BankRepository])],
  providers: [BanksService],
  controllers: [BanksController],
})
export class BanksModule {}
