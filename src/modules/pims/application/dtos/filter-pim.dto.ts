import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumberString, IsOptional } from "class-validator";
import { PaginateDto } from "src/common/dto/paginate.dto";


export class GetPimDto extends PaginateDto{
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  year?: number 
}