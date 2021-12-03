import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CronogramasModule } from './modules/cronogramas/cronogramas.module';
import { storageConfig } from './common/configs/storage.config';
import { StorageModule } from '@haorama/nestjs-storage';
import { DatabaseModule } from './database/database.module';
import { TypeRemunerationsModule } from './modules/type-remunerations/type-remunerations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.production'],
    }),
    StorageModule.forRoot(storageConfig),
    CronogramasModule,
    DatabaseModule,
    TypeRemunerationsModule,
  ],
})
export class AppModule {}