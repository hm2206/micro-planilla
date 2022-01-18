import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBooleanString, IsNumberString, IsOptional } from "class-validator";
import { PaginateDto } from "../../../../common/dto/paginate.dto";

export class GetInfosDto extends PaginateDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  contractId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  planillaId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  pimId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBooleanString()
  state?: string;

  @ApiPropertyOptional()
  @IsOptional()
  exceptCronogramaId?: number;
}