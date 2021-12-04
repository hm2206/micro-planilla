import { IsNumber, IsOptional } from 'class-validator';

export class FilterSyncToInfos {
  @IsOptional()
  @IsNumber()
  public planillaId = 0;

  @IsOptional()
  @IsNumber()
  public cargoId = 0;

  @IsOptional()
  @IsNumber()
  public typeCategoriaId = 0;
}