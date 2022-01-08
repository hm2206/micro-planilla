import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreatePimDto } from "../application/dtos/create-pim.dto";
import { EditPimDto } from "../application/dtos/edit-pim.dto";
import { GetPimDto } from "../application/dtos/filter-pim.dto";
import { PimsService } from "../application/pims.service";

@Controller('pims')
@ApiTags('pims')
export class PimsController {
  constructor(private pimsService: PimsService) { }
  
  @Get()
  public index(@Query() paginate: GetPimDto) {
    return this.pimsService.getPims(paginate);
  }
  
  @Post()
  public store(@Body() createPim: CreatePimDto) {
    return this.pimsService.createPim(createPim);
  }
  
  @Get(':id')
  public show(@Param('id') id: number) {
    return this.pimsService.findPim(id);
  }

  @Put(':id')
  public update(@Param('id') id: number, @Body() editPimDto: EditPimDto) {
    return this.pimsService.editPim(id, editPimDto);
  }

  @Get(':id/meta')
  public meta(@Param('id') id: number) {
    return this.pimsService.findMeta(id);
  }

  @Get(':id/cargo')
  public cargo(@Param('id') id: number) {
    return this.pimsService.findCargo(id);
  }
}