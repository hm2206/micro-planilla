import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { microserviceConfigName } from '../../common/configs/microservice.config';
import { SendMailDto } from './shipping.dto';
import { Observable } from 'rxjs';

@Injectable()
export class ShippingService {
  constructor(@Inject(microserviceConfigName.SHIPPING_SERVICE) 
  private rabbitmq: ClientProxy ) {}

  public sendMail(payload: SendMailDto): Observable<any> {
    return this.rabbitmq.emit('sendMail', payload);
  }  
}