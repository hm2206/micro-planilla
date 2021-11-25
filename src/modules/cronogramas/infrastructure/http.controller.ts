import { Controller, Param, Post, Query, StreamableFile  } from '@nestjs/common';
import { CustomValidation } from 'src/common/pipes/custom-validation.pipe';
import { ReportGeneralService } from '../application/report-general.service';
import { FilterTypeObject } from '../domain/cronograma.dto.ts';

@Controller('cronogramas')
export class HttpController {
  constructor(private reportGeneral: ReportGeneralService) {} 

  @Post(':id/report/general.xlsx')
  public async reportGeneralExcel(
    @Param('id') id: number, 
    @Query(new CustomValidation(FilterTypeObject)) query) {
    const file = await this.reportGeneral.excel(id, query);
    return new StreamableFile(file);
  }
}
