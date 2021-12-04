import { Injectable } from '@nestjs/common';
import { FilterSyncToInfos } from '../domain/type-remuneracion.dto';
import { TypeRemunerationRepository } from '../domain/type-remuneration.repository';
import { AddRemuneracionInfosProcedure } from '../domain/procedured/add-remuneracion-infos.procedured';

@Injectable()
export class ProcessTypeRemuneracionService {
  constructor(private typeRemuneracionRepository: TypeRemunerationRepository) {}

  public async syncToInfos(id: number, payload: FilterSyncToInfos) {
    await (new AddRemuneracionInfosProcedure()).call(id, payload.planillaId, payload.cargoId, payload.typeCategoriaId);
    return { process: true }
  }
}