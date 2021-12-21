import { IsNotEmpty, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { FilterTypeObject } from './filter-type.dto';

export class ChangeCargoId extends PartialType(FilterTypeObject) {
  @IsNotEmpty()
  @IsNumber()
  public targetCargoId: number;
}