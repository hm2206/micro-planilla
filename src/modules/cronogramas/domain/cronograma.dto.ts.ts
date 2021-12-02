import { IsBoolean, IsEmpty, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCronograma {
  @IsNotEmpty()
  @IsNumber()
  public year: number;

  @IsNotEmpty()
  @IsNumber()
  public mes: number;

  @IsNotEmpty()
  @IsNumber()
  public dias: number;

  @IsOptional()
  @MaxLength(255)
  public observacion: string;

  @IsNotEmpty()
  @IsNumber()
  public planillaId: number;

  @IsNotEmpty()
  @IsNumber()
  public entityId: number;
}

export class CreateCronogramaWithAdicional extends PartialType(CreateCronograma) {
  @IsNotEmpty()
  @IsNumber()
  public adicional: number;

  @IsNotEmpty()
  @IsBoolean()
  public remanente: boolean;
}

export class FilterTypeObject {
  @IsOptional()
  @IsNumber()
  public cargo_id?: number

  @IsOptional()
  @IsNumber()
  public type_categoria_id?: number

  @IsOptional()
  @IsNumber()
  public meta_id?: number
}