import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientHttpModule } from '../../client-http/client-http.module';
import { WorksService } from './application/works.service';
import { WorkRepository } from './domain/work.repository';
import { WorksController } from './infrastructure/works.controller';

@Module({
  imports: [
    ClientHttpModule,
    TypeOrmModule.forFeature([WorkRepository])
  ],
  providers: [WorksService],
  controllers: [WorksController],
})
export class WorksModule {}
