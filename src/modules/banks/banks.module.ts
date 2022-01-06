import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankEntity } from './domain/bank.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BankEntity])],
})
export class BanksModule {}
