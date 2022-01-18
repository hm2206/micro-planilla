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
  public ids?: number[];

  @IsOptional()
  public cronogramaId?: number

  @IsOptional()
  public pimId?: number

  @IsOptional()
  public typeCategoriaId?: number

  @IsOptional()
  public metaId?: number
}