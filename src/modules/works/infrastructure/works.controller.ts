import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateWorkDto } from "../application/dtos/create-work.dto";
import { WorksService } from "../application/works.service";

@Controller('works')
@ApiTags('works')
export class WorksController {
  constructor(private worksService: WorksService) { }
  
  @Get()
  public index() {
    return this.worksService.getWorks();
  }

  @Post()
  public store(@Body() createWorkDto: CreateWorkDto) {
    return this.worksService.createWork(createWorkDto);
  }
}