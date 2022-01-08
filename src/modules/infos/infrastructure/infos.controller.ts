import { Body, Controller, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
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

  @Put(':id')
  public update(@Param('id') id: number, @Body() editInfoDto: EditInfoDto) {
    return this.infosService.editInfo(id, editInfoDto);
  }
}