import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CronogramasModule } from './modules/cronogramas/cronogramas.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.production'],
    }),
    CronogramasModule,
    DatabaseModule,
  ],
})
export class AppModule {}
