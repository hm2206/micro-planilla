import { PaginateDto } from "../../../../common/dto/paginate.dto";

export class GetTypeObligationsDto extends PaginateDto {
  infoId?: number;
  typeDiscountId?: number;
}