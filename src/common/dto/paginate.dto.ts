import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginateDto {
  @IsOptional()
  @IsNumber()
  public page: number;

  @IsOptional()
  @IsNumber()
  public limit: number;

  @IsOptional()
  @IsString()
  public querySearch: string;
}