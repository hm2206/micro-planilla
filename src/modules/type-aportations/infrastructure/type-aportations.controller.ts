import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PaginateDto } from "src/common/dto/paginate.dto";
import { TypeAportationsService } from "../application/type-aportations.service";

@Controller('typeAportations')
@ApiTags('typeAportations')
export class TypeAportationsController {
  constructor(private typeAportationsService: TypeAportationsService) { }
  
  @Get()
  public index(@Query() paginate: PaginateDto) {
    return this.typeAportationsService.getAportations(paginate);
  }
}