import { Body, Controller, Param, Post, Delete } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateInfoTypeAportationDto } from "../application/dtos/create-info-type-aportation.dto";
import { InfoTypeAportationsService } from "../application/info-type-aportations.service";

@Controller('infoTypeAportations')
@ApiTags('infoTypeAportations')
export class InfoTypeAportationsController {
  constructor(private infoTypeAportationsService: InfoTypeAportationsService) { }

  @Post()
  public store(@Body() payload: CreateInfoTypeAportationDto) {
    return this.infoTypeAportationsService.createInfoTypeAportation(payload);
  }

  @Delete(':id')
  public delete(@Param('id') id: number) {
    return this.infoTypeAportationsService.deleteInfoTypeAportation(id);
  }
}