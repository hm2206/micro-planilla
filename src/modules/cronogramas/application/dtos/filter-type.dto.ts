import { IsNumber, IsOptional } from 'class-validator';

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