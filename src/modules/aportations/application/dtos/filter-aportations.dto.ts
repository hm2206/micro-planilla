import { PaginateDto } from "../../../../common/dto/paginate.dto";

export class GetAportationsDto extends PaginateDto {
  historialId?: number;
  typeAportationId?: number; 
}

export class FilterAportationBaseDto {
  ids?: number[];
  historialId?: number;
  typeAportationId?: number; 
}

export class GetCalcAportationDto extends FilterAportationBaseDto {}