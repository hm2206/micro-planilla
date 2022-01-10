import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';

export class PaginateDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  public page = "1";

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  public limit = "30";

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  public querySearch?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  public ids?: number[];
}