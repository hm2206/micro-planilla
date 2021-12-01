import { Injectable, InternalServerErrorException, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';
import { PaymentRequiredCollectionException, PaymentRequiredException } from '../exceptions/payment-required.exception';

@Injectable()
export class CustomValidation implements PipeTransform<any> {

  constructor(private obj: any, private collection: boolean = false) {}

  public async transform(value: Record<string, unknown>) {
    if (!this.collection) return await this.validateObject(value);
    return await this.validateCollection(value);
  }

  public async validateCollection(value: any | any[]) {
    if (!Array.isArray(value)) throw new InternalServerErrorException(
      `El valor debe de ser una coleccion del objecto[${this.obj.name}]`
    )
    const arrayValues = [...value];
    const errors = [];
    await arrayValues.forEach(async (arr, index) => {
      const result = await this.inputValidate(arr);
      if (result?.errors) {
        result.indexError = index;
        return errors.push(result);
      }
    });
    // enviar errors
    if (errors.length) throw new PaymentRequiredCollectionException(errors);
    return value;
  }

  public async validateObject(value: any) {
    if (Array.isArray(value)) throw new InternalServerErrorException(
      `El valor debe de ser un objecto[${this.obj.name}]`
    )
    const result = await this.inputValidate(value);
    if (result?.errors) throw result;
    return value;
  }

  public async inputValidate(value) {
    const validatedConfig: any = plainToClass(
      this.obj, 
      value, 
      { enableImplicitConversion: true }
    )
    const errors: ValidationError[] = validateSync(validatedConfig);
    if (errors.length) return new PaymentRequiredException(errors)
    return value;
  }
}
