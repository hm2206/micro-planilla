import { Controller, Get, Param, Query, StreamableFile  } from '@nestjs/common';
import { CustomValidation } from 'src/common/pipes/custom-validation.pipe';
import { ReportGeneralService } from '../application/report-general.service';
import { FilterTypeObject } from '../domain/cronograma.dto.ts';

@Controller('cronogramas/:id/report')
export class CronogramasReportController {
  constructor(private reportGeneral: ReportGeneralService) {} 

  @Get('/general.xlsx')
  public async generalExcel(
    @Param('id') id: number, 
    @Query(new CustomValidation(FilterTypeObject)) query) {
    const file = await this.reportGeneral.excel(id, query);
    return new StreamableFile(file);
  }
}
