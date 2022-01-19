import { Body, Controller, Delete, Get, Param, Post, Query  } from '@nestjs/common';
import { CreateCronogramaService } from '../application/create-cronograma.service';
import { ProcessCronogramasService } from '../application/process-cronogramas.service';
import { ReportGeneralService } from '../application/report-general.service';
import { SendBoletaCronogramas } from '../application/send-boleta-cronogramas.service';
import { CreateCronogramaWithAdicionalDto } from '../application/dtos/create-cronogram.dto';
import { ChangeCargoId } from '../application/dtos/change-cargo.dto';
import { FilterRemoveHistorialDto, GetCronogramaDto } from '../application/dtos/filter-type.dto';
import { ApiTags } from '@nestjs/swagger';
import { CronogramasService } from '../application/cronogramas.service';
import { PaginateDto } from 'src/common/dto/paginate.dto';

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

  @Delete(':id')
  public delete(@Param('id') id: number) {
    return this.cronogramasService.findDelete(id);
  }

  @Post(':id/changeCargo')
  public changeCargo(@Param('id') id: number,
    @Body() payload: ChangeCargoId) {
    return this.proccessCronogramaService.changeCargo(id, payload.targetCargoId, payload);
  }

  @Post(':id/process')
  public process(@Param('id') id: number) {
    return this.proccessCronogramaService.processing(id);
  }

  @Get(':id/historials')
  public historials(@Param('id') id: number,
    @Query() paginate: PaginateDto) {
    return this.cronogramasService.findHistorials(id, paginate);
  }

  @Post(':id/historials')
  public add(@Param('id') id: number,
    @Body('ids') infoIds: number[]) {
    return this.proccessCronogramaService.addHistorials(id, infoIds);
  }

  @Delete(':id/historials')
  public remove(@Param('id') id: number,
    @Body() payload: FilterRemoveHistorialDto) {
    return this.proccessCronogramaService.removeHistorials(id, payload);
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
