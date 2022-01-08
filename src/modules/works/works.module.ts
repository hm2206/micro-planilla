import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientHttpModule } from '../../client-http/client-http.module';
import { ContractsModule } from '../contracts/contracts.module';
import { WorksService } from './application/works.service';
import { WorkRepository } from './domain/work.repository';
import { WorkSubscription } from './domain/work.subscription';
import { WorksController } from './infrastructure/works.controller';

@Module({
  imports: [
    ClientHttpModule,
    forwardRef(() => ContractsModule),
    TypeOrmModule.forFeature([WorkRepository])
  ],
  providers: [WorksService, WorkSubscription],
  controllers: [WorksController],
  exports: [WorksService],
})
export class WorksModule {}
