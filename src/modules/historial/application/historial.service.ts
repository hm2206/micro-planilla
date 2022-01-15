import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { RemunerationsService } from 'src/modules/remunerations/application/remunerations.service';
import { PaginateDto } from '../../../common/dto/paginate.dto';
import { HistorialRepository } from '../domain/historial.repository';
import { GetHistorialsDto } from './dtos/filter-historials.dto';
import { UpdateHistorialDto } from './dtos/update-historial.dto';

@Injectable()
export class HistorialService {
  constructor(
    private remunerationsService: RemunerationsService,
    private historialRepository: HistorialRepository) { }

  public async getHistorial(paginate: GetHistorialsDto) {
    const queryBuilder = this.historialRepository.createQueryBuilder('his')
      .innerJoinAndSelect('his.cronograma', 'cro')
      .innerJoinAndSelect('his.info', 'inf')
      .innerJoinAndSelect('his.pim', 'pim')
      .innerJoinAndSelect('his.afp', 'afp')
      .innerJoinAndSelect('his.bank', 'bank')
      .innerJoin('inf.contract', 'cont')
      .innerJoin('cont.work', 'w')
      .orderBy('w.orderBy', 'ASC')
    if (paginate.cronogramaId) queryBuilder.where(`his.cronogramaId = ${paginate.cronogramaId}`);
    // buscar trabajador
    if (paginate.querySearch) {
      const searchArray = paginate.querySearch.split(" ");
      const realSearch = [];
      // búsqueda avanzada
      searchArray.forEach(q => realSearch.push(`w.orderBy like '%${q}%'`));
      queryBuilder.andWhere(`(${realSearch.join(' OR ')})`);
    }
    return await this.historialRepository.paginate(queryBuilder, paginate);
  }

  public async editHistorial(id, payload: UpdateHistorialDto) {
    try {
      const history = await this.historialRepository.findOneOrFail(id);
      const partial = Object.assign(history, payload);
      return await this.historialRepository.save(partial);
    } catch (error) {
      throw new InternalServerErrorException;
    }
  }

  public async findRemunerations(id: number, paginate: PaginateDto) {
    const historial = await this.historialRepository.findOneOrFail(id);
    return await this.remunerationsService.getRemunerations({
      ...paginate,
      historialId: historial.id
    });
  }

  public async findResume(id: number) {
    const historial = await this.historialRepository.findOneOrFail(id);
    // obtener total bruto
    const [calcTotal] = await this.remunerationsService.getCalcTotal({
      historialId: historial.id
    })
    // obtener base imponible
    const [calcIsBase] = await this.remunerationsService.getCalcIsBase({
      historialId: historial.id
    });
    // calc
    const totalRemuneration = parseFloat(`${calcTotal?.amount || 0}`);
    const totalBase = parseFloat(`${calcIsBase?.amount || 0}`)
    const totalDiscount = parseFloat(`0.00`)
    const totalAportation = parseFloat(`0.00`)
    const totalNeto = totalRemuneration - totalDiscount;
    // response
    return {
      totalRemuneration,
      totalBase,
      totalDiscount,
      totalAportation,
      totalNeto
    }
  }
}