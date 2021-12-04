import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientHttpModule } from '../client-http/client-http.module';
import { InfoModule } from '../infos/infos.module';
import { MicroservicesModule } from '../microservices/microservices.module';
import { ProcessHistorialService } from './application/process-historial.service';
import { SendBoletaService } from './application/send-boleta.service';
import { HistorialRepository } from './domain/historial.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([HistorialRepository]),
    ClientHttpModule,
    MicroservicesModule,
    InfoModule,
  ],
  providers: [
    SendBoletaService, 
    ProcessHistorialService
  ],
  exports: [
    SendBoletaService, 
    ProcessHistorialService
  ],
})
export class HistorialModule {}