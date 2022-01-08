import { PaginateDto } from "../../../../common/dto/paginate.dto";


export class GetInfosDto extends PaginateDto {
  contractId?: number;
  planillaId?: number;
  pimId?: number;
}