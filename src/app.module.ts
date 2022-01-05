import { Module } from '@nestjs/common';
import { CronogramasModule } from './modules/cronogramas/cronogramas.module';
import { storageConfig } from './common/configs/storage.config';
import { StorageModule } from '@haorama/nestjs-storage';
import { DatabaseModule } from './database/database.module';
import { TypeRemunerationsModule } from './modules/type-remunerations/type-remunerations.module';
import { PimsModule } from './modules/pims/pims.module';
import { CargosModule } from './modules/cargos/cargos.module';
import { MetasModule } from './modules/metas/metas.module';
import { PimLogsModule } from './modules/pim-logs/pim-logs.module';
import { ConfigsModule } from './common/configs/configs.module';

@Module({
  imports: [
    ConfigsModule,
    StorageModule.forRoot(storageConfig),
    CronogramasModule,
    DatabaseModule,
    TypeRemunerationsModule,
    PimsModule,
    CargosModule,
    MetasModule,
    PimLogsModule,
  ],
})
export class AppModule {}