import { PaginateDto } from "../../../../common/dto/paginate.dto";

export class FilterAffiliationsBaseDto {
  ids?: number[];
  discountId?: number;
  infoTypeAffiliationId?: number;
}

export class GetAffiliationsDto extends PaginateDto {
  discountId?: number;
  infoTypeAffiliationId?: number;
  historialId?: number;
}