import { HttpException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import * as Joi from 'joi'

type paymentItem = {
  [key: string]: any
}

export class PaymentRequiredJoiException extends HttpException {

  errors: paymentItem[] = []

  code: "PAYMENT_REQUIRED"

  constructor(detailPayments: Joi.ValidationErrorItem[]) {
    super('Payment Required', 402);
    this.formatter(detailPayments);
  }

  getStatus(): number {
    return 402;
  }

  formatter(details: Joi.ValidationErrorItem[]) {
    details.forEach(detail => {
      let key = detail.context.key;
      let value = [detail.message];
      this.errors.push({ [key]: value });
    })
  }
}

export class PaymentRequiredException extends HttpException {

  errors: paymentItem = {};
  indexError: 0;

  constructor(errors: ValidationError[]) {
    super('Payment Required', 402);
    super.name = "ERR_PAYMENT_REQUIRED";
    this.formatter(errors);
  }

  getStatus(): number {
    return 402;
  }

  formatter(errors: ValidationError[]) {
    errors.forEach(error => {
      const children = error.children;
      if (!children.length) {
        return this.errors[error.property] = Object.values(error.constraints);
      }
      const errorChildrens = {};
      // agreagar children
      children.forEach(c => {
        errorChildrens[c.property] = Object.values(c.constraints);
      })
      // add errors
      return this.errors[error.property] = errorChildrens;
    })
  }
}

export class PaymentRequiredCollectionException extends HttpException {

  private errors: paymentItem = {};

  constructor(errors: PaymentRequiredException[]) {
    super('Payment Required', 402);
    super.name = "ERR_PAYMENT_REQUIRED";
    this.formatter(errors);
  }

  private formatter(errors: PaymentRequiredException[]) {
    errors.forEach(err => {
      Object.keys(err.errors).forEach(attr => {
        this.errors[`${attr}@${err.indexError}`] = err.errors[attr];
      });
    });
  }
}