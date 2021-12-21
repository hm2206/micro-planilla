import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CronogramaRepository } from '../domain/cronograma.repository';
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
import { FilterTypeObject } from '../domain/cronograma.dto.ts';
import { ProcessHistorialService } from 'src/modules/historial/application/process-historial.service';

@Injectable()
export class ProcessCronogramasService {
  constructor(
    private processHistorialService: ProcessHistorialService,
    private cronogramaRepository: CronogramaRepository) {}

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

  public async changeCargo(id: number, cargoId: number, filter: FilterTypeObject) {
    const cronograma = await this.cronogramaRepository.findOneOrFail(id);
    // validar si el cronograma está abierto
    if (!cronograma.state) throw new InternalServerErrorException("El cronograma ya está cerrado");
    // verificamos si es remanente
    const isRemanente = cronograma.remanente ? true : false;
    // preparar filtros
    const filterUpdate = {
      cronogramaId: cronograma.id,
      ...filter
    }
    // preparar datos
    const data = { cargoId }
    // actualizar historial
    await this.processHistorialService.updateMassive(filterUpdate, data, !isRemanente);
    // result
    return { process: true };
  }
}