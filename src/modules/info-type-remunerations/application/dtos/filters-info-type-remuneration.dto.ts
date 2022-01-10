import { IsNumberString, IsOptional } from "class-validator";
import { PaginateDto } from "../../../../common/dto/paginate.dto";

export class GetInfoTypeRemunerations extends PaginateDto {
  @IsOptional()
  @IsNumberString()
  infoId?: number;

  @IsOptional()
  @IsNumberString()
  typeRemunerationId?: number;
}