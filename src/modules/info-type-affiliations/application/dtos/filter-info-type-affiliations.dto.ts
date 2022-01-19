import { PaginateDto } from "../../../../common/dto/paginate.dto";

export class GetInfoTypeAffiliationsDto extends PaginateDto {
  infoId?: number;
  typeAffiliationId?: number;
}