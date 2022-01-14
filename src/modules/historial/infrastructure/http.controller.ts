import { Body, Controller, Param, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UpdateHistorialDto } from "../application/dtos/update-historial.dto";
import { HistorialService } from "../application/historial.service";

@Controller('historials')
@ApiTags('historials')
export class HttpController {
  constructor(private historialsService: HistorialService) { }
  
  @Put(':id')
  public update(@Param('id') id: number, @Body() payload: UpdateHistorialDto) {
    return this.historialsService.editHistorial(id, payload);
  }
}