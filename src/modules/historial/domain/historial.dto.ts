import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class UpdateHistorial {
  @IsNumber()
  public cargoId?: number;

  @IsNotEmpty()
  public typeCategoriaId?: number;

  @IsNotEmpty()
  public metaId?: number;
}

export class FilterTypeObject {
  @IsOptional()
  public cronogramaId?: number

  @IsOptional()
  public cargoId?: number

  @IsOptional()
  public typeCategoriaId?: number

  @IsOptional()
  public metaId?: number
}