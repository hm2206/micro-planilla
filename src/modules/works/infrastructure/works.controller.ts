import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PaginateDto } from "src/common/dto/paginate.dto";
import { CreateWorkDto } from "../application/dtos/create-work.dto";
import { EditWorkDto } from "../application/dtos/edit-work.dto";
import { WorksService } from "../application/works.service";

@Controller('works')
@ApiTags('works')
export class WorksController {
  constructor(private worksService: WorksService) { }
  
  @Get()
  public index(@Query() paginate: PaginateDto) {
    return this.worksService.getWorks(paginate);
  }

  @Post()
  public store(@Body() createWorkDto: CreateWorkDto) {
    return this.worksService.createWork(createWorkDto);
  }

  @Get(':id')
  public show(@Param('id') id: number) {
    return this.worksService.findWork(id);
  }

  @Put(':id')
  public update(@Param('id') id: number, @Body() editWorkDto: EditWorkDto) {
    return this.worksService.editWork(id, editWorkDto);
  }
}