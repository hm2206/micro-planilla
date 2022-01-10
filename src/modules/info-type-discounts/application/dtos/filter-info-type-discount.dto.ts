import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";
import { PaginateDto } from "../../../../common/dto/paginate.dto";

export class GetInfoTypeDiscount extends PaginateDto {
  @ApiPropertyOptional()
  @IsNumberString()
  infoId?: number;

  @ApiPropertyOptional()
  @IsNumberString()
  typeDiscountId?: number;
}