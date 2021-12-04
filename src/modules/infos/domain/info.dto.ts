import { IsNumber, IsOptional } from "class-validator";

export class FilterInfo {
  @IsOptional()
  @IsNumber()
  public cargoId?: number;

  @IsOptional()
  @IsNumber()
  public typeCategoriaId?: number;

  @IsOptional()
  @IsNumber()
  public metaId?: number;

  @IsOptional()
  @IsNumber()
  public ids?: number[];
}

export class UpdateInfo {
  @IsOptional()
  @IsNumber()
  public cargoId?: number;

  @IsOptional()
  @IsNumber()
  public typeCategoriaId?: number;

  @IsOptional()
  @IsNumber()
  public metaId?: number;
}