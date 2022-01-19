import { PaginateDto } from "../../../../common/dto/paginate.dto";

export class FilterContractDto {
  ids?: number[];
  workId?: number;
  state?: boolean;
}

export class GetContractDto extends PaginateDto {
  workId?: number;
  state?: boolean;
}