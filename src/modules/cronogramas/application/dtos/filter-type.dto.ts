import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsOptional } from 'class-validator';
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

  campusId?: number;
  planillaId?: number;
  principal?: boolean;                                                                                                                                                                                                                                                                                                                                                                                        
}