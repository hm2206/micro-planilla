import { PaginateDto } from "src/common/dto/paginate.dto";

export class FilterBaseDiscounts {
  ids?: number[];
  historialId?: number;
  typeDiscountId?: number;
}

export class GetDiscountsDto extends PaginateDto {
  historialId?: number;
  typeDiscountId?: number;
}