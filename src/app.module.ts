import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CronogramasModule } from './modules/cronogramas/cronogramas.module';
import { DatabaseModule } from './database/database.module';
import { TypeRemunerationsModule } from './modules/type-remunerations/type-remunerations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.production'],
    }),
    CronogramasModule,
    DatabaseModule,
    TypeRemunerationsModule,
  ],
})
export class AppModule {}
