import { Body, Controller, Get, Param, Post, Query, StreamableFile  } from '@nestjs/common';
import { CreateCronogramaService } from '../application/create-cronograma.service';
import { ProcessCronogramasService } from '../application/process-cronogramas.service';
import { ReportGeneralService } from '../application/report-general.service';
import { SendBoletaCronogramas } from '../application/send-boleta-cronogramas.service';
import { CreateCronogramaDto, CreateCronogramaWithAdicionalDto } from '../application/dtos/create-cronogram.dto';
import { ChangeCargoId } from '../application/dtos/change-cargo.dto';
import { FilterTypeObject, GetCronogramaDto } from '../application/dtos/filter-type.dto';
import { ApiTags } from '@nestjs/swagger';
import { CronogramasService } from '../application/cronogramas.service';

@Controller('cronogramas')
@ApiTags('cronogramas')
export class HttpController {
  constructor(
    private sendBoletaCronogramas: SendBoletaCronogramas,
    private cronogramasService: CronogramasService,
    private createCronogramaService: CreateCronogramaService,
    private proccessCronogramaService: ProcessCronogramasService,
    private reportGeneral: ReportGeneralService
  ) {} 

  @Get() 
  public index(@Query() paginate: GetCronogramaDto) {
    return this.cronogramasService.getCronogramas({
      ...paginate,
      principal: true
    });
  }

  @Get('notPrincipal')
  public indexNotPrincipal(@Query() paginate: GetCronogramaDto) {
    return this.cronogramasService.getCronogramas({
      ...paginate,
      principal: false
    });
  }

  @Post()
  public store(@Body() payload: CreateCronogramaWithAdicionalDto) {
    return this.createCronogramaService.create(payload);
  }

  @Get(':id')
  public show(@Param('id') id: number) {
    return this.cronogramasService.findCronograma(id);
  }

  @Post(':id/clone')
  public clone(@Param('id') id: number,
    @Body() payload: CreateCronogramaDto) {
    return this.createCronogramaService.clone(id, payload);
  }

  @Post(':id/changeCargo')
  public changeCargo(@Param('id') id: number, @Body() payload: ChangeCargoId) {
    return this.proccessCronogramaService.changeCargo(id, payload.targetCargoId, payload);
  }

  @Post(':id/process')
  public process(@Param('id') id: number) {
    return this.proccessCronogramaService.processing(id);
  }

  // @Post(':id/report/general.xlsx')
  // public async reportGeneralExcel(
  //   @Param('id') id: number, @Query() query: FilterTypeObject): Promise<StreamableFile> {
  //   const file = await this.reportGeneral.excel(id, query);
  //   return new StreamableFile(file);
  // }

  @Post(':id/sendMail')
  public sendMail(@Param('id') id: number) {
    return this.sendBoletaCronogramas.sendMail(id);
  }
}
