import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PaginateDto } from "src/common/dto/paginate.dto";
import { MetasService } from "../application/metas.service";

@Controller('metas')
@ApiTags('metas')
export class MetasController {
  constructor(private metasService: MetasService) { }
  
  @Get()
  public index(@Query() paginate: PaginateDto) {
    return this.metasService.getMetas(paginate);
  } 
}