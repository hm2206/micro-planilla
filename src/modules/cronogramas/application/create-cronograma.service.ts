import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateCronograma } from '../domain/cronograma.dto.ts';
import { CronogramaEntity } from '../domain/cronograma.entity';
import { CronogramaRepository } from '../domain/cronograma.repository';
import { AddAportacionesProcedured } from '../domain/procedured/add-aportaciones.procedured';
import { AddDescuentosProcedured } from '../domain/procedured/add-descuentos.procedured';
import { AddInfosProcedured } from '../domain/procedured/add-infos.procedured';
import { AddObligacionProcedured } from '../domain/procedured/add-obligacion.procedured';
import { AddRemuneracionesProcedured } from '../domain/procedured/add-remuneraciones.procedured';
import { AddSindicatoProcedured } from '../domain/procedured/add-sindicato.procedured';
import { ClearPayProcedured } from '../domain/procedured/clear-pay.procedured';
import { ConfigAfpProcedured } from '../domain/procedured/config-afp.procedured';
import { ConfigEdadProcedured } from '../domain/procedured/config-edad.procedured';
import { ConfigPagoProcedured } from '../domain/procedured/config-pago.procedured';
import { CopyCronogramaProcedured } from '../domain/procedured/copy-cronograma.procedured';
import { UpdateAfpAporteProcedured } from '../domain/procedured/update-afp-aporte.procedured';
import { UpdateAfpPrimaProcedured } from '../domain/procedured/update-afp-prima.procedured';
import { UpdateAfpTypeProcedured } from '../domain/procedured/update-afp-type.procedured';
import { UpdateAportacionProcedured } from '../domain/procedured/update-aportacion.procedured';
import { UpdateCalcRemuneracionDiaProcedured } from '../domain/procedured/update-calc-remuneracion-dia.procedured';
import { UpdateDescuentoEscalafonProcedured } from '../domain/procedured/update-descuento-escalafon.procedured';
import { UpdateObligacionProcedured } from '../domain/procedured/update-obligacion.procedured';
import { UpdateSindicatoProcedured } from '../domain/procedured/update-sindicato.procedured';

@Injectable()
export class CreateCronogramaService {
  constructor(private cronogramaRepository: CronogramaRepository) {}

  public async create(payload: CreateCronograma): Promise<CronogramaEntity> {
    try {
      const tmpCronograma = this.cronogramaRepository.create(payload)
      const cronograma = await this.cronogramaRepository.save(tmpCronograma);
      // processar datos
      await (new AddInfosProcedured).call(cronograma.id);
      await (new AddRemuneracionesProcedured).call(cronograma.id);
      await (new AddDescuentosProcedured).call(cronograma.id);
      await (new ConfigAfpProcedured).call(cronograma.id);
      await (new AddAportacionesProcedured).call(cronograma.id);
      await (new ConfigEdadProcedured).call(cronograma.id);
      await (new ConfigPagoProcedured).call(cronograma.id);
      await (new UpdateCalcRemuneracionDiaProcedured).call(cronograma.id);
      await (new ClearPayProcedured).call(cronograma.id);
      await (new AddObligacionProcedured).call(cronograma.id);
      await (new UpdateObligacionProcedured).call(cronograma.id);
      await (new UpdateAfpAporteProcedured).call(cronograma.id);
      await (new UpdateAfpPrimaProcedured).call(cronograma.id);
      await (new UpdateAfpTypeProcedured).call(cronograma.id);
      await (new AddSindicatoProcedured).call(cronograma.id);
      await (new UpdateSindicatoProcedured).call(cronograma.id);
      await (new UpdateAportacionProcedured).call(cronograma.id);
      await (new UpdateDescuentoEscalafonProcedured).call(cronograma.id);
      return cronograma;
    } catch (err) {
      throw new InternalServerErrorException("No se pudó guardar los datos");
    }
  }

  public async createClone(id: number, payload: CreateCronograma): Promise<any> {
    try { 
      const cronogramaSource = await this.cronogramaRepository.findOneOrFail(id);
      // validar planilla
      if (cronogramaSource.planillaId != payload.planillaId) throw new InternalServerErrorException(`
        La planilla es incompatible con la planilla recurso
      `)
      // crear cronograma
      const tmpCronograma = this.cronogramaRepository.create(payload);
      const cronograma = await this.cronogramaRepository.save(tmpCronograma);
      // processar datos
      await (new CopyCronogramaProcedured).call(cronogramaSource.id, cronograma.id);
      await (new ConfigAfpProcedured).call(cronograma.id);
      await (new AddAportacionesProcedured).call(cronograma.id);
      await (new ConfigEdadProcedured).call(cronograma.id);
      await (new ConfigPagoProcedured).call(cronograma.id);
      await (new UpdateCalcRemuneracionDiaProcedured).call(cronograma.id);
      await (new ClearPayProcedured).call(cronograma.id);
      await (new AddObligacionProcedured).call(cronograma.id);
      await (new UpdateObligacionProcedured).call(cronograma.id);
      await (new UpdateAfpAporteProcedured).call(cronograma.id);
      await (new UpdateAfpPrimaProcedured).call(cronograma.id);
      await (new UpdateAfpTypeProcedured).call(cronograma.id);
      await (new AddSindicatoProcedured).call(cronograma.id);
      await (new UpdateSindicatoProcedured).call(cronograma.id);
      await (new UpdateAportacionProcedured).call(cronograma.id);
      await (new UpdateDescuentoEscalafonProcedured).call(cronograma.id);
      return cronograma;
    } catch (error) {
      throw new InternalServerErrorException("No se pudo clonar el cronograma");
    }
  }
}