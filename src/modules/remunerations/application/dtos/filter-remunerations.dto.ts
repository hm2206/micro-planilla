import { PaginateDto } from "../../../../common/dto/paginate.dto";

export class GetRemunerationsDto extends PaginateDto {
  historialId?: number;
  typeRemunerationId?: number;
}

export class FilterBaseRemuneration {
  ids?: [];
  historialId?: number;
  typeRemunerationId?: number;
}

export class GetCalcBase extends FilterBaseRemuneration {}

export class GetCalcTotal extends GetCalcBase {}