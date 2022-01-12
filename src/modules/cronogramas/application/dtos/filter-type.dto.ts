import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBooleanString, IsNumber, IsNumberString, IsOptional } from 'class-validator';
import { PaginateDto } from 'src/common/dto/paginate.dto';

export class FilterTypeObject {
  @IsOptional()
  @IsNumber()
  public pimId?: number

  @IsOptional()
  @IsNumber()
  public typeCategoryId?: number
}

export class GetCronogramaDto extends PaginateDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  year?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  month?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  planillaId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBooleanString()
  state?: boolean;

  campusId?: number;
  principal?: boolean;                                                                                                                                                                                                                                                                                                                                                                                        
}