import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { PaymentRequiredException } from '../exceptions/payment-required.exception';

@Injectable()
export class ValidationInputsPipe implements PipeTransform {
  public async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) return value;

    const object = plainToClass(metatype, value);
    const errors = await validate(object, {
      whitelist: true,
    });

    if (!errors.length) return object;
    
    // execute errors;
    throw new PaymentRequiredException(errors);
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
