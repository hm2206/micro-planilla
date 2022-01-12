import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PaginateDto } from "src/common/dto/paginate.dto";
import { CreateInfoDto } from "../application/dtos/create-info.dto";
import { EditInfoDto } from "../application/dtos/edit-info.dto";
import { InfosService } from "../application/infos.service";

@Controller('infos')
@ApiTags('infos')
export class InfosController {
  constructor(private infosService: InfosService) { }
  
  @Post()
  public store(@Body() createInfoDto: CreateInfoDto) {
    return this.infosService.createInfo(createInfoDto);
  }

  @Get(':id')
  public show(@Param('id') id: number) {
    return this.infosService.findInfo(id);
  }

  @Put(':id')
  public update(@Param('id') id: number, @Body() editInfoDto: EditInfoDto) {
    return this.infosService.editInfo(id, editInfoDto);
  }

  @Get(':id/typeRemunerations')
  public typeRemunerations(@Param('id') id: number, @Query() paginate: PaginateDto) {
    return this.infosService.findTypeRemunerations(id, paginate);
  }

  @Get(':id/typeDiscounts')
  public typeDiscounts(@Param('id') id: number, @Query() paginate: PaginateDto) {
    return this.infosService.findTypeDiscounts(id, paginate);
  }

  @Get(':id/typeAportations')
  public typeAportations(@Param('id') id: number, @Query() paginate: PaginateDto) {
    return this.infosService.findTypeAportations(id, paginate);
  }
}