import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PaginateDto } from "../../../common/dto/paginate.dto";
import { DependenciesService } from "../application/dependencies.service";

@Controller('dependencies')
@ApiTags('dependencies')
export class DependenciesController {
  constructor(private dependenciesService: DependenciesService) { }
  
  @Get()
  public index(@Query() paginate: PaginateDto) {
    return this.dependenciesService.getDependencies(paginate);
  }
}