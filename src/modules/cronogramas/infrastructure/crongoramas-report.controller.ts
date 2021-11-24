import { Controller, Get } from '@nestjs/common';

@Controller('cronogramas/:id/report')
export class CronogramasReportController {
  @Get('/general.xlsx')
  public generalExcel() {
    return 'ok';
  }
}
