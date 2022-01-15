import { PaginateDto } from "../../../../common/dto/paginate.dto";

export class GetRemunerationsDto extends PaginateDto {
  historialId?: number;
  typeRemunerationId?: number;
}