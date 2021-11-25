import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { PaymentRequiredException } from '../exceptions/payment-required.exception';
import * as Joi from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform<any> {

  private schema: Joi.Schema;

  constructor(schema: Joi.Schema) {
    this.schema = schema;
  }

  transform(value: any, metadata: ArgumentMetadata) {
    // const { error } = this.schema.validate(value, { 
    //   abortEarly: false,
    //   allowUnknown: true,
    //   stripUnknown: true,
    // });

    // if (!error) return value;
    console.log(this.schema);
    return value;
    // throw new  PaymentRequiredException(error.details)
  }
}
