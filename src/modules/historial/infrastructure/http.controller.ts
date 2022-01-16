import { Body, Controller, Get, Param, Put, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PaginateDto } from "../../../common/dto/paginate.dto";
import { UpdateHistorialDto } from "../application/dtos/update-historial.dto";
import { HistorialService } from "../application/historial.service";

@Controller('historials')
@ApiTags('historials')
export class HttpController {
  constructor(private historialsService: HistorialService) { }
  
  @Put(':id')
  public update(@Param('id') id: number,
    @Body() payload: UpdateHistorialDto) {
    return this.historialsService.editHistorial(id, payload);
  }

  @Get(':id/remunerations')
  public remunerations(@Param('id') id: number,
    @Query() paginate: PaginateDto) {
    return this.historialsService.findRemunerations(id, paginate);
  }

  @Get(':id/discounts')
  public discounts(@Param('id') id: number,
    @Query() paginate: PaginateDto) {
    return this.historialsService.findDiscounts(id, paginate);
  }

  @Get(':id/aportations')
  public aportations(@Param('id') id: number,
    @Query() paginate: PaginateDto) {
    return this.historialsService.findAportations(id, paginate);
  }

  @Get(':id/affiliations')
  public affiliations(@Param('id') id: number,
    @Query() paginate: PaginateDto) {
    return this.historialsService.findAffiliations(id, paginate);
  }

  @Get(':id/resume')
  public resume(@Param('id') id: number) {
    return this.historialsService.findResume(id);
  }
}