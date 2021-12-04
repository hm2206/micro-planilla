import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class UpdateHistorial {
  @IsNotEmpty()
  @IsNumber()
  public cargoId?: number;

  @IsNotEmpty()
  @IsNumber()
  public typeCategoriaId?: number;

  @IsNotEmpty()
  @IsNumber()
  public metaId?: number;
}

export class FilterTypeObject {
  @IsOptional()
  @IsNumber()
  public cronogramaId?: number

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