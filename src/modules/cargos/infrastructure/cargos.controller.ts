import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PaginateDto } from "src/common/dto/paginate.dto";
import { CargosService } from "../application/cargos.service";

@Controller('cargos')
@ApiTags('cargos')
export class CargosController {
  constructor(private cargosService: CargosService) { }
  
  @Get()
  public index(@Query() paginate: PaginateDto) {
    return this.cargosService.getCargos(paginate);
  }
}