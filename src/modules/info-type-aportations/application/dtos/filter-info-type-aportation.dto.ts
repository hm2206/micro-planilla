import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";
import { PaginateDto } from "../../../../common/dto/paginate.dto";

export class GetInfoTypeAportationDto extends PaginateDto {
  @ApiPropertyOptional()
  @IsNumberString()
  infoId?: number;

  @ApiPropertyOptional()
  @IsNumberString()
  typeAportationId?: number;
}