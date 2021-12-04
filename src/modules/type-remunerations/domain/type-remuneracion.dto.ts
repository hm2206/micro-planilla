import { IsOptional } from 'class-validator';

export class FilterSyncToInfos {
  @IsOptional()
  public planillaId = 0;

  @IsOptional()
  public metaId = 0;

  @IsOptional()
  public cargoId = 0;

  @IsOptional()
  public typeCategoriaId = 0;
}