import { Controller, Get } from '@nestjs/common';

@Controller('cronogramas')
export class CronogramasController {
  @Get()
  public index() {
    return 'ok';
  }
}
