import { Body, Controller, Param, Post } from '@nestjs/common';
import { CustomValidation } from 'src/common/pipes/custom-validation.pipe';
import { ProcessTypeRemuneracionService } from '../application/process-type-remuneracion.service';
import { FilterSyncToInfos } from '../domain/type-remuneracion.dto';

@Controller('typeRemuneracions')
export class HttpTypeRemuneracionController {
  constructor(private processTypeRemuneracionService: ProcessTypeRemuneracionService) {}

  @Post(':id/syncToInfos')
  public async syncToInfos(@Param('id') id,
    @Body(new CustomValidation(FilterSyncToInfos)) payload) {
    return this.processTypeRemuneracionService.syncToInfos(id, payload);
  }

}