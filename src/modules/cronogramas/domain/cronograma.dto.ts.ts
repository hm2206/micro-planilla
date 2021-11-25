import { IsNumber, IsOptional } from 'class-validator';

export class FilterTypeObject {
  @IsOptional()
  @IsNumber()
  public cargoId?: number

  @IsOptional()
  @IsNumber()
  public typeCategoriaId?: number

  @IsOptional()
  @IsNumber()
  public metaId?: number
}