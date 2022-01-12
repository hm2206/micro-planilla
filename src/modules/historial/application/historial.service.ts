import { Injectable } from '@nestjs/common';
import { HistorialRepository } from '../domain/historial.repository';
import { HistorialEntity } from '../domain/historial.entity';
import { GetHistorialsDto } from './dtos/filter-historials.dto';

@Injectable()
export class HistorialService {
  constructor(private historialRepository: HistorialRepository) {}

  public async getHistorial(paginate: GetHistorialsDto) {
    const queryBuilder = this.historialRepository.createQueryBuilder('his')
      .innerJoinAndSelect('his.cronograma', 'cro')
      .innerJoinAndSelect('his.info', 'inf')
      .innerJoinAndSelect('his.pim', 'pim')
      .innerJoinAndSelect('his.afp', 'afp')
      .innerJoinAndSelect('his.bank', 'bank')
    if (paginate.cronogramaId) queryBuilder.where(`his.cronogramaId = ${paginate.cronogramaId}`);
    // buscar trabajador
    if (paginate.querySearch) {
      const searchArray = paginate.querySearch.split(" ");
      const realSearch = [];
      queryBuilder.innerJoin('inf.contract', 'cont')
        .innerJoin('cont.work', 'w')
      // búsqueda avanzada
      searchArray.forEach(q => realSearch.push(`w.orderBy like '%${q}%'`));
      queryBuilder.andWhere(`(${realSearch.join(' OR ')})`);
    }
    return await this.historialRepository.paginate(queryBuilder, paginate);
  }

  public async update(id, payload: HistorialEntity) {
    const history = await this.historialRepository.findOneOrFail(id);
    await this.historialRepository.update(history.id, payload);
    return { process: true };
  }
}