import { Body, Controller, Param, Post, Query, StreamableFile  } from '@nestjs/common';
import { CustomValidation } from 'src/common/pipes/custom-validation.pipe';
import { CreateCronogramaService } from '../application/create-cronograma.service';
import { ReportGeneralService } from '../application/report-general.service';
import { CreateCronograma, FilterTypeObject, CreateCronogramaWithAdicional } from '../domain/cronograma.dto.ts';
import { ShippingService } from 'src/modules/microservices/shipping/shipping.service';
import { SendMailDto } from 'src/modules/microservices/shipping/shipping.dto';

@Controller('cronogramas')
export class HttpController {
  constructor(
    private shippingService: ShippingService,
    private createCronogramaService: CreateCronogramaService,
    private reportGeneral: ReportGeneralService
  ) {} 


  @Post()
  public async store(@Body(new CustomValidation(CreateCronogramaWithAdicional)) payload) {
    return await this.createCronogramaService.create(payload);
  }

  @Post(':id/clone')
  public async clone(@Param('id') id: number,
    @Body(new CustomValidation(CreateCronograma)) payload
  ) {
    return await this.createCronogramaService.clone(id, payload);
  }

  @Post(':id/report/general.xlsx')
  public async reportGeneralExcel(
    @Param('id') id: number, 
    @Query(new CustomValidation(FilterTypeObject)) query) {
    const file = await this.reportGeneral.excel(id, query);
    return new StreamableFile(file);
  }

  @Post(':id/sendMail')
  public async sendMail() {
    const result = this.shippingService.sendMail({
      email: 'twd2206@gmail.com',
      subject: 'Enviar Correo',
      content: 'Listo ok'
    } as SendMailDto);
    result.subscribe({
      next: (data) => console.log(data),
      error: (err) => console.log(err)
    })
    return 'ok';
  }
}
