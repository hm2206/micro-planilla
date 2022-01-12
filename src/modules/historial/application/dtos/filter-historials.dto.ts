import { PaginateDto } from "../../../../common/dto/paginate.dto";

export class GetHistorialsDto extends PaginateDto {
  cronogramaId?: number;
}