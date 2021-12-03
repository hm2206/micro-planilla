import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientHttpModule } from '../client-http/client-http.module';
import { MicroservicesModule } from '../microservices/microservices.module';
import { SendBoletaService } from './application/send-boleta.service';
import { HistorialRepository } from './domain/historial.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([HistorialRepository]),
    ClientHttpModule,
    MicroservicesModule,
  ],
  providers: [SendBoletaService],
  exports: [SendBoletaService],
})
export class HistorialModule {}