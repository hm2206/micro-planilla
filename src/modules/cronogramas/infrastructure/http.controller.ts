import { Body, Controller, Param, Post, Query, Res, StreamableFile  } from '@nestjs/common';
import { Response } from 'express';
import { CustomValidation } from 'src/common/pipes/custom-validation.pipe';
import { ParseErrorResponse } from 'src/common/utils/parse-error-response';
import { CronogramasService } from '../application/cronogramas.service';
import { ReportGeneralService } from '../application/report-general.service';
import { CreateCronograma, FilterTypeObject } from '../domain/cronograma.dto.ts';

@Controller('cronogramas')
export class HttpController {
  constructor(
    private cronogramasService: CronogramasService,
    private reportGeneral: ReportGeneralService
  ) {} 

  @Post()
  public async stote(
    @Res() response: Response,
    @Body(new CustomValidation(CreateCronograma)) payload) {
    const result = this.cronogramasService.create(payload);
    return result.subscribe({
      next: (data) => response.json(data),
      error: (err) => new ParseErrorResponse(err).response(response)
    })
  }

  @Post(':id/report/general.xlsx')
  public async reportGeneralExcel(
    @Param('id') id: number, 
    @Query(new CustomValidation(FilterTypeObject)) query) {
    const file = await this.reportGeneral.excel(id, query);
    return new StreamableFile(file);
  }
}
