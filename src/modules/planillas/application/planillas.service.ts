import { Injectable } from '@nestjs/common';
import { PlanillaRepository } from '../domain/planilla.repository';

@Injectable()
export class PlanillasService {
  constructor(private planillaRepository: PlanillaRepository) {}

  public async findOrFail(id: number) {
    return await this.planillaRepository.findOneOrFail(id);
  }
}