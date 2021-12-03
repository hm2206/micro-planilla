import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ClientHttpService } from './application/client-http.service';
import * as https from 'https';
import { AuthHttpService } from './application/auth-http.service';

@Module({
  imports: [
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
