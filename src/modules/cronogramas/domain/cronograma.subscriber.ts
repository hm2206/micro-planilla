import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { CronogramaEntity } from './cronograma.entity';
import ObjectId from 'bson-objectid';
import { ConfigAfpProcedured } from './procedured/config-afp.procedured';
import { AddAportacionesProcedured } from './procedured/add-aportaciones.procedured';
import { ConfigEdadProcedured } from './procedured/config-edad.procedured';
import { ConfigPagoProcedured } from './procedured/config-pago.procedured';
import { UpdateCalcRemuneracionDiaProcedured } from './procedured/update-calc-remuneracion-dia.procedured';
import { ClearPayProcedured } from './procedured/clear-pay.procedured';
import { AddObligacionProcedured } from './procedured/add-obligacion.procedured';
import { UpdateObligacionProcedured } from './procedured/update-obligacion.procedured';
import { UpdateAfpAporteProcedured } from './procedured/update-afp-aporte.procedured';
import { UpdateAfpPrimaProcedured } from './procedured/update-afp-prima.procedured';
import { UpdateAfpTypeProcedured } from './procedured/update-afp-type.procedured';
import { AddSindicatoProcedured } from './procedured/add-sindicato.procedured';
import { UpdateSindicatoProcedured } from './procedured/update-sindicato.procedured';
import { UpdateAportacionProcedured } from './procedured/update-aportacion.procedured';
import { UpdateDescuentoEscalafonProcedured } from './procedured/update-descuento-escalafon.procedured';
import { PlanillasService } from 'src/modules/planillas/application/planillas.service';
import { InternalServerErrorException } from '@nestjs/common';

@EventSubscriber()
export class CronogramaSubscriber implements EntitySubscriberInterface<CronogramaEntity> {
  constructor(
    connection: Connection,
    private planillasService: PlanillasService
  ) {
    connection.subscribers.push(this);
  }

  public listenTo() {
    return CronogramaEntity;
  }

  public async beforeInsert(event: InsertEvent<CronogramaEntity>) {
    const token = new ObjectId().toHexString();
    const cronograma = event.entity;
    const planilla = await this.planillasService.findOrFail(cronograma.planillaId);
    cronograma.token = token;
    cronograma.descripcion = planilla.description;
  }

  public afterInsert(event: InsertEvent<CronogramaEntity>) {
    try {
      const cronograma = event.entity;
      (new ConfigAfpProcedured).call(cronograma.id);
      (new AddAportacionesProcedured).call(cronograma.id);
      (new ConfigEdadProcedured).call(cronograma.id);
      (new ConfigPagoProcedured).call(cronograma.id);
      (new UpdateCalcRemuneracionDiaProcedured).call(cronograma.id);
      (new ClearPayProcedured).call(cronograma.id);
      (new AddObligacionProcedured).call(cronograma.id);
      (new UpdateObligacionProcedured).call(cronograma.id);
      (new UpdateAfpAporteProcedured).call(cronograma.id);
      (new UpdateAfpPrimaProcedured).call(cronograma.id);
      (new UpdateAfpTypeProcedured).call(cronograma.id);
      (new AddSindicatoProcedured).call(cronograma.id);
      (new UpdateSindicatoProcedured).call(cronograma.id);
      (new UpdateAportacionProcedured).call(cronograma.id);
      (new UpdateDescuentoEscalafonProcedured).call(cronograma.id);
    } catch (error) {
      throw new InternalServerErrorException("No se puede procesar el cronograma");
    }
  }
}