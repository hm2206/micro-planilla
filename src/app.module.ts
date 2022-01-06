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
import { ContractsModule } from './modules/contracts/contracts.module';
import { DependenciesModule } from './modules/dependencies/dependencies.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { WorksModule } from './modules/works/works.module';
import { BanksModule } from './modules/banks/banks.module';
import { TypeCargosModule } from './modules/type-cargos/type-cargos.module';
import { TypeDiscountsModule } from './modules/type-discounts/type-discounts.module';
import { TypeAportationsModule } from './modules/type-aportations/type-aportations.module';
import { TypeSindicatosModule } from './modules/type-sindicatos/type-sindicatos.module';
import { TypeDetallesModule } from './modules/type-detalles/type-detalles.module';
import { TypeOblicationsModule } from './modules/type-oblications/type-oblications.module';

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
    ContractsModule,
    DependenciesModule,
    ProfilesModule,
    WorksModule,
    BanksModule,
    TypeCargosModule,
    TypeDiscountsModule,
    TypeAportationsModule,
    TypeSindicatosModule,
    TypeDetallesModule,
    TypeOblicationsModule,
  ],
})
export class AppModule {}