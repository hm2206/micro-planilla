import { Injectable } from '@nestjs/common';
import { PlanillaRepository } from '../domain/planilla.repository';
import { GetPlanillasDto } from './dtos/filter-planillas.dto';

@Injectable()
export class PlanillasService {
  constructor(private planillaRepository: PlanillaRepository) {}

  public async getPlanillas(paginate: GetPlanillasDto) {
    const queryBuilder = this.planillaRepository.createQueryBuilder('p');
    if (typeof paginate.principal != 'undefined') {
      const principal = JSON.parse(`${paginate.principal}`);
      queryBuilder.andWhere('p.principal = :principal', { principal });
    }
    return await this.planillaRepository.paginate(queryBuilder, paginate);
  }

  public async findOrFail(id: number) {
    return await this.planillaRepository.findOneOrFail(id);
  }
}