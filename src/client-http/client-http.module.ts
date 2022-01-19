import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ClientHttpService } from './application/client-http.service';
import * as https from 'https';
import { AuthHttpService } from './application/auth-http.service';
import { StoragesModule } from '../common/storages/storages.module';

@Module({
  imports: [
    StoragesModule,
    HttpModule.register({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    })
  ],
  providers: [ClientHttpService, AuthHttpService],
  exports: [ClientHttpService, AuthHttpService],
})
export class ClientHttpModule {}
