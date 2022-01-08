import { Controller, Get, Query } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { PaginateDto } from "src/common/dto/paginate.dto";
import { PlanillasService } from "../application/planillas.service";

@Controller('planillas')
@ApiTags('planillas')
export class PlanillasController {
  constructor(private planillasService: PlanillasService) { }
  
  @Get()
  @ApiQuery({ type: [PaginateDto] })
  public index(@Query() paginate: PaginateDto) {
    return this.planillasService.getPlanillas(paginate);
  }
}