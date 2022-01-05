import { Body, Controller, Param, Post, Query, StreamableFile  } from '@nestjs/common';
import { CustomValidation } from '../../../common/pipes/custom-validation.pipe';
import { CreateCronogramaService } from '../application/create-cronograma.service';
import { ProcessCronogramasService } from '../application/process-cronogramas.service';
import { ReportGeneralService } from '../application/report-general.service';
import { SendBoletaCronogramas } from '../application/send-boleta-cronogramas.service';
import { CreateCronogramaDto, CreateCronogramaWithAdicionalDto } from '../application/dtos/create-cronogram.dto';
import { ChangeCargoId } from '../application/dtos/change-cargo.dto';
import { FilterTypeObject } from '../application/dtos/filter-type.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('cronogramas')
@ApiTags('cronogramas')
export class HttpController {
  constructor(
    private sendBoletaCronogramas: SendBoletaCronogramas,
    private createCronogramaService: CreateCronogramaService,
    private proccessCronogramaService: ProcessCronogramasService,
    private reportGeneral: ReportGeneralService
  ) {} 


  @Post()
  @ApiBody({ type: [CreateCronogramaWithAdicionalDto] })
  public async store(@Body(new CustomValidation(CreateCronogramaWithAdicionalDto)) payload) {
    return await this.createCronogramaService.create(payload);
  }

  @Post(':id/clone')
  @ApiBody({ type: [CreateCronogramaDto] })
  public async clone(@Param('id') id: number,
    @Body(new CustomValidation(CreateCronogramaDto)) payload) {
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
    @Query(new CustomValidation(FilterTypeObject)) query): Promise<StreamableFile> {
    const file = await this.reportGeneral.excel(id, query);
    return new StreamableFile(file);
  }

  @Post(':id/sendMail')
  public async sendMail(@Param('id') id: number) {
    return this.sendBoletaCronogramas.sendMail(id);
  }
}
