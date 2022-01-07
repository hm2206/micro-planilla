import { IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';

export class PaginateDto {
  @IsOptional()
  @IsNumberString()
  public page = "1";

  @IsOptional()
  @IsNumberString()
  public limit = "30";

  @IsOptional()
  @IsString()
  public querySearch?: string;

  @IsOptional()
  @IsNumber()
  public ids?: number[];
}