import { Injectable } from '@nestjs/common';
import { CronogramaRepository } from '../domain/cronograma.repository';
import { GetCronogramaDto } from './dtos/filter-type.dto';

@Injectable()
export class CronogramasService {
  constructor(private cronogramaRepository: CronogramaRepository) {}

  public async getCronogramas(paginate: GetCronogramaDto) {
    const queryBuilder = this.cronogramaRepository.createQueryBuilder('c')
      .innerJoinAndSelect('c.planilla', 'p')
    if (paginate.year) queryBuilder.andWhere("c.year = :year", paginate);
    if (paginate.month) queryBuilder.andWhere("c.month = :month", paginate);
    if (paginate.planillaId) queryBuilder.andWhere("c.planillaId = :planillaId", paginate);
    if (paginate.campusId) queryBuilder.andWhere("c.campusId = :campusId", paginate);
    if (typeof paginate.principal != 'undefined') {
      queryBuilder.andWhere("p.principal = :principal", paginate);
    }
    // result
    const result = await this.cronogramaRepository.paginate(queryBuilder, paginate);
    // add historialsCounts
    const cronogramaIds: number[] = result.items.pluck('id').toArray();
    const historialCount = await this.cronogramaRepository.getCountHistorial(cronogramaIds);
    result.items.map(item => {
      const total = historialCount.items.where('id', item.id).first()?.total || 0;
      item.historialsCount = parseInt(`${total}`);
      return item;
    })
    // response
    return result;
  }

  public async findCronograma(id: number) {
    return await this.cronogramaRepository.findOneOrFail(id);
  }
}