import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientHttpModule } from '../../client-http/client-http.module';
import { InfoModule } from '../infos/infos.module';
import { MicroservicesModule } from '../../microservices/microservices.module';
import { ProcessHistorialService } from './application/process-historial.service';
import { SendBoletaService } from './application/send-boleta.service';
import { HistorialRepository } from './domain/historial.repository';
import { HistorialService } from './application/historial.service';
import { RabbitMqController } from './infrastructure/rabbitmq.crontroller';
import { HttpController } from './infrastructure/http.controller';
import { HistorialSubscriber } from './domain/historial.subscriber';
import { RemunerationsModule } from '../remunerations/remunerations.module';
import { DiscountsModule } from '../discounts/discounts.module';
import { AportationsModule } from '../aportations/aportations.module';
import { AffiliationsModule } from '../affiliations/affiliations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([HistorialRepository]),
    ClientHttpModule,
    MicroservicesModule,
    RemunerationsModule,
    DiscountsModule,
    AportationsModule,
    AffiliationsModule,
    InfoModule,
  ],
  providers: [
    HistorialSubscriber,
    HistorialService,
    SendBoletaService, 
    ProcessHistorialService
  ],
  controllers: [
    HttpController,
    RabbitMqController
  ],
  exports: [
    HistorialService,
    SendBoletaService, 
    ProcessHistorialService
  ],
})
export class HistorialModule {}