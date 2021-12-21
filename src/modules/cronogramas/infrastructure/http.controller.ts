import { Body, Controller, Param, Post, Query, StreamableFile  } from '@nestjs/common';
import { CustomValidation } from 'src/common/pipes/custom-validation.pipe';
import { CreateCronogramaService } from '../application/create-cronograma.service';
import { ProcessCronogramasService } from '../application/process-cronogramas.service';
import { ReportGeneralService } from '../application/report-general.service';
import { SendBoletaCronogramas } from '../application/send-boleta-cronogramas.service';
import { CreateCronograma, FilterTypeObject, CreateCronogramaWithAdicional, ChangeCargoId } from '../domain/cronograma.dto.ts';

@Controller('cronogramas')
export class HttpController {
  constructor(
    private sendBoletaCronogramas: SendBoletaCronogramas,
    private createCronogramaService: CreateCronogramaService,
    private proccessCronogramaService: ProcessCronogramasService,
    private reportGeneral: ReportGeneralService
  ) {} 


  @Post()
  public async store(@Body(new CustomValidation(CreateCronogramaWithAdicional)) payload) {
    return await this.createCronogramaService.create(payload);
  }

  @Post(':id/clone')
  public async clone(@Param('id') id: number,
    @Body(new CustomValidation(CreateCronograma)) payload) {
    return await this.createCronogramaService.clone(id, payload);
  }

  @Post(':id/changeCargo')
  public async changeCargo(@Param('id') id: number,
    @Body(new CustomValidation(ChangeCargoId)) payload) {
    return this.proccessCronogramaService.changeCargo(id, payload.targetCargoId, payload);
  }

  @Post(':id/process')
  public async process(@Param('id') id: number) {
    return this.proccessCronogramaService.processing(id);
  }

  @Post(':id/report/general.xlsx')
  public async reportGeneralExcel(
    @Param('id') id: number, 
    @Query(new CustomValidation(FilterTypeObject)) query) {
    const file = await this.reportGeneral.excel(id, query);
    return new StreamableFile(file);
  }

  @Post(':id/sendMail')
  public async sendMail(@Param('id') id: number) {
    return this.sendBoletaCronogramas.sendMail(id);
  }
}
