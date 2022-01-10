import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginateDto } from 'src/common/dto/paginate.dto';
import { CustomValidation } from '../../../common/pipes/custom-validation.pipe';
import { ProcessTypeRemuneracionService } from '../application/process-type-remuneracion.service';
import { TypeRemunerationsService } from '../application/type-remunerations.service';
import { FilterSyncToInfos } from '../domain/type-remuneracion.dto';

@Controller('typeRemunerations')
@ApiTags('typeRemunerations')
export class HttpTypeRemuneracionController {
  constructor(
    private typeRemunerationsService: TypeRemunerationsService,
    private processTypeRemuneracionService: ProcessTypeRemuneracionService) { }

  @Get()
  public index(@Query() paginate: PaginateDto) {
    return this.typeRemunerationsService.getTypeRemunerations(paginate);
  }

  @Post(':id/syncToInfos')
  public syncToInfos(@Param('id') id,
    @Body(new CustomValidation(FilterSyncToInfos)) payload) {
    return this.processTypeRemuneracionService.syncToInfos(id, payload);
  }
}