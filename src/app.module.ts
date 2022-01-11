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
import { TypeDetailsModule } from './modules/type-details/type-details.module';
import { TypeOblicationsModule } from './modules/type-oblications/type-oblications.module';
import { AfpsModule } from './modules/afps/afps.module';
import { TypeCategoriesModule } from './modules/type-categories/type-categories.module';
import { HourhandsModule } from './modules/hourhands/hourhands.module';
import { InfoTypeRemunerationsModule } from './modules/info-type-remunerations/info-type-remunerations.module';
import { InfoTypeDiscountsModule } from './modules/info-type-discounts/info-type-discounts.module';
import { InfoTypeAportationsModule } from './modules/info-type-aportations/info-type-aportations.module';
import { InfoTypeSindicatosModule } from './modules/info-type-sindicatos/info-type-sindicatos.module';
import { ConfigTypeDiscountsModule } from './modules/config-type-discounts/config-type-discounts.module';
import { ConfigTypeRemunerationsModule } from './modules/config-type-remunerations/config-type-remunerations.module';
import { ConfigTypeAportationsModule } from './modules/config-type-aportations/config-type-aportations.module';
import { RemunerationsModule } from './modules/remunerations/remunerations.module';
import { DiscountsModule } from './modules/discounts/discounts.module';
import { AportationsModule } from './modules/aportations/aportations.module';
import { SindicatosModule } from './modules/sindicatos/sindicatos.module';
import { ObligationsModule } from './modules/obligations/obligations.module';
import { DetailsModule } from './modules/details/details.module';

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
    TypeDetailsModule,
    TypeOblicationsModule,
    AfpsModule,
    TypeCategoriesModule,
    HourhandsModule,
    InfoTypeRemunerationsModule,
    InfoTypeDiscountsModule,
    InfoTypeAportationsModule,
    InfoTypeSindicatosModule,
    ConfigTypeDiscountsModule,
    ConfigTypeRemunerationsModule,
    ConfigTypeAportationsModule,
    RemunerationsModule,
    DiscountsModule,
    AportationsModule,
    SindicatosModule,
    ObligationsModule,
    DetailsModule,
  ],
})
export class AppModule {}