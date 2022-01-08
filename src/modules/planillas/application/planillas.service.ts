import { Injectable } from '@nestjs/common';
import { PaginateDto } from 'src/common/dto/paginate.dto';
import { PlanillaRepository } from '../domain/planilla.repository';

@Injectable()
export class PlanillasService {
  constructor(private planillaRepository: PlanillaRepository) {}

  public async getPlanillas(paginate: PaginateDto) {
    const queryBuilder = this.planillaRepository.createQueryBuilder('p');
    return await this.planillaRepository.paginate(queryBuilder, paginate);
  }

  public async findOrFail(id: number) {
    return await this.planillaRepository.findOneOrFail(id);
  }
}