import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PaginateDto } from 'src/common/dto/paginate.dto';
import { HistorialService } from 'src/modules/historial/application/historial.service';
import { CronogramaRepository } from '../domain/cronograma.repository';
import { GetCronogramaDto } from './dtos/filter-type.dto';

@Injectable()
export class CronogramasService {
  constructor(
    private historialRepository: HistorialService,
    private cronogramaRepository: CronogramaRepository) { }

  public async getCronogramas(paginate: GetCronogramaDto) {
    const queryBuilder = this.cronogramaRepository.createQueryBuilder('c')
      .innerJoinAndSelect('c.planilla', 'p')
    if (paginate.year) queryBuilder.andWhere("c.year = :year", paginate);
    if (paginate.month) queryBuilder.andWhere("c.month = :month", paginate);
    if (paginate.planillaId) queryBuilder.andWhere("c.planillaId = :planillaId", paginate);
    if (paginate.campusId) queryBuilder.andWhere("c.campusId = :campusId", paginate);
    if (typeof paginate.state != 'undefined') {
      const state = JSON.parse(`${paginate.state}`);
      queryBuilder.andWhere(`c.state = ${state}`);
    }
    // filtrar por planilla principal
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
    const cronograma = this.cronogramaRepository.createQueryBuilder('cro')
      .innerJoinAndSelect('cro.planilla', 'pla')
      .where('cro.id = :id', { id });
    return await cronograma.getOneOrFail();
  }

  public async findHistorials(id: number, paginate: PaginateDto) { 
    const cronograma = await this.cronogramaRepository.findOneOrFail(id);
    return await this.historialRepository.getHistorial({
      ...paginate,
      cronogramaId: cronograma.id
    })
  }

  public async findDelete(id: number) {
    try {
      await this.cronogramaRepository.delete(id);
      return { process: true }
    } catch (error) {
      throw new InternalServerErrorException;
    }
  }
}