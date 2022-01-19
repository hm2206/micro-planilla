import { PaginateDto } from "../../../../common/dto/paginate.dto";

export class GetObligationsDto extends PaginateDto {
  infoId?: number;
  typeAffiliationId?: number;
  historialId?: number;
}