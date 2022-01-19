import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CronogramaRepository } from '../domain/cronograma.repository';
import { CalcConfigCronogramaProcedured } from '../domain/procedured/calc-config-cronograma.procedured';
import { AddAportationsProcedured } from '../../aportations/domain/procedured/add-aportations.procedured';
import { CalcRemunerationsProcedured } from '../../remunerations/domain/procedured/calc-remuneration.procedured';
import { CalcAfpsProcedured } from '../../afps/domain/procedured/calc-afps.procedured';
import { FilterRemoveHistorialDto, FilterTypeObject } from '../application/dtos/filter-type.dto';
import { ProcessHistorialService } from '../../historial/application/process-historial.service';
import { CalcObligationsProcedured } from '../../../modules/obligations/domain/procedured/calc-obligations.procedured';
import { CalcDiscountsProcedured } from '../../../modules/discounts/domain/procedured/calc-discounts.procedured';
import { AddDiscountsProcedured } from '../../discounts/domain/procedured/add-discounts.procedured';
import { AddRemunerationsProcedured } from '../../remunerations/domain/procedured/add-remunerations.procedured';


@Injectable()
export class ProcessCronogramasService {
  constructor(
    private processHistorialService: ProcessHistorialService,
    private cronogramaRepository: CronogramaRepository) {}

  public async processing(id: number) {
    try {
      await (new AddRemunerationsProcedured).call(id);
      await (new AddDiscountsProcedured).call(id);
      await (new CalcConfigCronogramaProcedured).call(id);
      await (new AddAportationsProcedured).call(id);
      await (new CalcRemunerationsProcedured).call(id);
      await (new CalcObligationsProcedured).call(id);
      await (new CalcAfpsProcedured).call(id);
      await (new CalcDiscountsProcedured).call(id);
      return { process: true }
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

  public async addHistorials(id: number, infoIds: any[]) {
    try {
      const cronograma = await this.cronogramaRepository.findOneOrFail(id);
      await this.processHistorialService.createMassive(cronograma.id, infoIds);
      return await this.processing(cronograma.id);
    } catch (error) {
      throw new InternalServerErrorException;
    }
  }

  public async removeHistorials(id: number, filters: FilterRemoveHistorialDto) {
    const cronograma = await this.cronogramaRepository.findOneOrFail(id);
    return await this.processHistorialService.deleteMassive({
      ...filters,
      cronogramaId: cronograma?.id
    });
  }
}