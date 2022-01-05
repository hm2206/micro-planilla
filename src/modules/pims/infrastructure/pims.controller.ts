import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreatePimDto } from "../application/dtos/create-pim.dto";
import { EditPimDto } from "../application/dtos/edit-pim.dto";
import { PimsService } from "../application/pims.service";

@Controller('pims')
export class PimsController {
  constructor(private pimsService: PimsService) { }
  
  @Get()
  public index() {
    return this.pimsService.getPims();
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

  @Delete(':id')
  public delete(@Param('id') id: number) {
    return id;
  }
}