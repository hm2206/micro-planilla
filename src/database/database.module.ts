import { Module } from '@nestjs/common';
import { mysqlService } from './mysql.service';

@Module({
  imports: [mysqlService],
})
export class DatabaseModule {}
