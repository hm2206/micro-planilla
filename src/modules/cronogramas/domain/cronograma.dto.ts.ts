import { IsNumber } from 'class-validator';

export class FilterTypeObject {
  @IsNumber()
  public cargoId?: number

  @IsNumber()
  public typeCategoriaId?: number

  @IsNumber()
  public metaId?: number
}