import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBooleanString, IsOptional } from "class-validator";
import { PaginateDto } from "../../../../common/dto/paginate.dto";

export class GetContractsToWorkDto extends PaginateDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBooleanString()
  state?: boolean
}