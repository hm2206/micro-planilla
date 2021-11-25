import { Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';
import { PaymentRequiredException } from '../exceptions/payment-required.exception';

@Injectable()
export class CustomValidation implements PipeTransform<any> {

  constructor(private obj: any) {}

  public async transform(value: Record<string, unknown>) {
    const validatedConfig: any = plainToClass(
      this.obj, 
      value, 
      { enableImplicitConversion: true }
    )
    // validar errrors
    const errors: ValidationError[] = validateSync(validatedConfig);
    if (errors.length) throw new  PaymentRequiredException(errors)
    return value;
  }
}
