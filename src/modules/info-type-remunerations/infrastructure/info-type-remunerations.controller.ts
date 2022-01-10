import { Body, Controller, Delete, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateInfoTypeRemunerationDto } from "../application/dtos/create-info-type-remuneration.dto";
import { EditInfoTypeRemunerationDto } from "../application/dtos/edit-info-type-remuneration.dto";
import { InfoTypeRemunerationsService } from "../application/info-type-remunerations.service";

@Controller('infoTypeRemunerations')
@ApiTags('infoTypeRemunerations')
export class InfoTypeRemunerationsController {
  constructor(private infoTypeRemuneraionsService: InfoTypeRemunerationsService) { }
  
  @Post()
  public store(@Body() payload: CreateInfoTypeRemunerationDto) {
    return this.infoTypeRemuneraionsService.createInfoTypeRemuneration(payload);  
  }

  @Put(':id')
  public update(@Param('id') id: number, @Body() payload: EditInfoTypeRemunerationDto) {
    return this.infoTypeRemuneraionsService.editInfoTypeRemuneration(id, payload);
  }

  @Delete(':id')
  public delete(@Param('id') id: number) {
    return this.infoTypeRemuneraionsService.deleteInfoTypeRemuneration(id);
  }
}