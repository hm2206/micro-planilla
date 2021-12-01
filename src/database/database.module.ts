import { Module } from '@nestjs/common';
import { mysqlService } from './mysql.service';
import { Seeder } from './seeder';

@Module({
  imports: [mysqlService, Seeder],
  exports: [Seeder],
})
export class DatabaseModule {}
