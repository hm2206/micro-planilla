import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCronograma, CreateCronogramaWithAdicional } from '../domain/cronograma.dto.ts';
import { CronogramaEntity } from '../domain/cronograma.entity';
import { CronogramaRepository } from '../domain/cronograma.repository';
import { AddDescuentosProcedured } from '../domain/procedured/add-descuentos.procedured';
import { AddInfosProcedured } from '../domain/procedured/add-infos.procedured';
import { AddRemuneracionesProcedured } from '../domain/procedured/add-remuneraciones.procedured';
import { CopyCronogramaProcedured } from '../domain/procedured/copy-cronograma.procedured';
import { ConfigAfpProcedured } from '../domain/procedured/config-afp.procedured';
import { AddAportacionesProcedured } from '../domain/procedured/add-aportaciones.procedured';
import { ConfigEdadProcedured } from '../domain/procedured/config-edad.procedured';
import { ConfigPagoProcedured } from '../domain/procedured/config-pago.procedured';
import { UpdateCalcRemuneracionDiaProcedured } from '../domain/procedured/update-calc-remuneracion-dia.procedured';
import { ClearPayProcedured } from '../domain/procedured/clear-pay.procedured';
import { AddObligacionProcedured } from '../domain/procedured/add-obligacion.procedured';
import { UpdateObligacionProcedured } from '../domain/procedured/update-obligacion.procedured';
import { UpdateAfpAporteProcedured } from '../domain/procedured/update-afp-aporte.procedured';
import { UpdateAfpPrimaProcedured } from '../domain/procedured/update-afp-prima.procedured';
import { UpdateAfpTypeProcedured } from '../domain/procedured/update-afp-type.procedured';
import { AddSindicatoProcedured } from '../domain/procedured/add-sindicato.procedured';
import { UpdateSindicatoProcedured } from '../domain/procedured/update-sindicato.procedured';
import { UpdateAportacionProcedured } from '../domain/procedured/update-aportacion.procedured';
import { UpdateDescuentoEscalafonProcedured } from '../domain/procedured/update-descuento-escalafon.procedured';

@Injectable()
export class CreateCronogramaService {
  constructor(private cronogramaRepository: CronogramaRepository) {}

  public async create(payload: CreateCronogramaWithAdicional): Promise<CronogramaEntity> {
    try {
      const isAdicional = payload.adicional >= 1;
      // validar adicional
      if (isAdicional) {
        // obtener cronogramas;
        const countAdicional = await this.cronogramaRepository.createQueryBuilder()
          .where(`entity_id = ${payload.entityId}`)
          .andWhere(`planilla_id = ${payload.planillaId}`)
          .andWhere(`year = ${payload.year}`)
          .andWhere(`mes = ${payload.mes}`)
          .getCount();
        // validar creación de adicional
        if (!countAdicional) throw new InternalServerErrorException("No se puede crear adicional");
        payload.adicional = countAdicional;
        payload.remanente = new Boolean(payload.remanente).valueOf();
        const tmpCronograma = this.cronogramaRepository.create(payload)
        return await this.cronogramaRepository.save(tmpCronograma);
      } else {
        payload.remanente = false;
        const tmpCronograma = this.cronogramaRepository.create(payload)
        const cronograma = await this.cronogramaRepository.save(tmpCronograma);
        // processar datos
        await (new AddInfosProcedured).call(cronograma.id);
        await (new AddRemuneracionesProcedured).call(cronograma.id);
        await (new AddDescuentosProcedured).call(cronograma.id);
        await this.processing(cronograma.id);
        return cronograma
      }
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  public async clone(id: number, payload: CreateCronograma): Promise<any> {
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
      await this.processing(cronograma.id);
      return cronograma;
    } catch (error) {
      throw new InternalServerErrorException("No se pudo clonar el cronograma");
    }
  }

  public async processing(id: number) {
    try {
      await (new ConfigAfpProcedured).call(id);
      await (new AddAportacionesProcedured).call(id);
      await (new ConfigEdadProcedured).call(id);
      await (new ConfigPagoProcedured).call(id);
      await (new UpdateCalcRemuneracionDiaProcedured).call(id);
      await (new ClearPayProcedured).call(id);
      await (new AddObligacionProcedured).call(id);
      await (new UpdateObligacionProcedured).call(id);
      await (new UpdateAfpAporteProcedured).call(id);
      await (new UpdateAfpPrimaProcedured).call(id);
      await (new UpdateAfpTypeProcedured).call(id);
      await (new AddSindicatoProcedured).call(id);
      await (new UpdateSindicatoProcedured).call(id);
      await (new UpdateAportacionProcedured).call(id);
      await (new UpdateDescuentoEscalafonProcedured).call(id);
    } catch (error) {
      throw new InternalServerErrorException("No se pudó procesar el cronograma!");
    }
  }
}