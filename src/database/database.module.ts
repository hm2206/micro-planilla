import { Module } from '@nestjs/common';
import { ConfigsModule } from '../common/configs/configs.module';
import { mysqlService } from './mysql.service';
import { Seeder } from './seeder';

@Module({
  imports: [
    ConfigsModule,
    mysqlService,
    Seeder
  ],
  exports: [Seeder],
})
export class DatabaseModule {}
