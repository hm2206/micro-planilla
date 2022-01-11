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
    return await this.cronogramaRepository.paginate(queryBuilder, paginate);
  }

  public async findCronograma(id: number) {
    return await this.cronogramaRepository.findOneOrFail(id);
  }
}