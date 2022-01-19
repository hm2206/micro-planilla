import { PaginateDto } from "src/common/dto/paginate.dto";

export class GetDiscountsDto extends PaginateDto {
  historialId?: number;
  typeDiscountId?: number;
}

export class FilterBaseDiscountsDto {
  ids?: number[];
  historialId?: number;
  typeDiscountId?: number;
}

export class GetCalcDiscountDto extends FilterBaseDiscountsDto {}