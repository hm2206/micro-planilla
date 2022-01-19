import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GetPlanillasDto } from "../application/dtos/filter-planillas.dto";
import { PlanillasService } from "../application/planillas.service";

@Controller('planillas')
@ApiTags('planillas')
export class PlanillasController {
  constructor(private planillasService: PlanillasService) { }
  
  @Get()
  public index(@Query() paginate: GetPlanillasDto) {
    return this.planillasService.getPlanillas(paginate);
  }
}