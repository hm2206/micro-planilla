import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBooleanString, IsNumber, IsNumberString, IsOptional } from 'class-validator';
import { PaginateDto } from 'src/common/dto/paginate.dto';

export class FilterTypeObject {
  @ApiPropertyOptional()
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

export class FilterRemoveHistorialDto extends FilterTypeObject {
  @ApiPropertyOptional({ isArray: true, type: Number })
  @IsOptional()
  @IsNumber({}, { each: true })
  public ids?: number[]
}