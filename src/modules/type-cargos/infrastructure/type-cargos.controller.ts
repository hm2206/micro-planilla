import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PaginateDto } from "src/common/dto/paginate.dto";
import { TypeCargosService } from "../application/type-cargos.service";

@Controller('typeCargos')
@ApiTags('typeCargos')
export class TypeCargosController {
  constructor(private typeCargosService: TypeCargosService) { }
  
  @Get()
  public index(@Query() paginate: PaginateDto) {
    return this.typeCargosService.getTypeCargos(paginate);
  }
}