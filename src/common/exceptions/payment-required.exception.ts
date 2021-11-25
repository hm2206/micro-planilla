import { HttpException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

type paymentItem = {
  [key: string]: string[]
}

export class PaymentRequiredException extends HttpException {

  errors: paymentItem[] = []

  code: "PAYMENT_REQUIRED"

  constructor(errors: ValidationError[]) {
    super('Payment Required', 402);
    this.formatter(errors);
  }

  getStatus(): number {
    return 402;
  }

  formatter(errors: ValidationError[]) {
    errors.forEach(error => {
      const key = error.property;
      const value = Object.values(error.constraints);
      this.errors.push({ [key]: value });
    })
  }
}
