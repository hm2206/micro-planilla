import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { PaymentRequiredJoiException } from '../exceptions/payment-required.exception';
import { Schema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: Schema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value, { 
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    });

    if (!error) return value;

    throw new  PaymentRequiredJoiException(error.details)
  }
}
