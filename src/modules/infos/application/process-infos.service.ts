import { Injectable } from '@nestjs/common';
import { InfoRepository } from '../domain/info.repository';
import { FilterInfo, UpdateInfo } from '../domain/info.dto';

@Injectable()
export class ProcessInfosService {
  constructor(private infoRepository: InfoRepository) {}

  public async updateMassive(filter: FilterInfo, payload: UpdateInfo) {
    const createEntity: any = this.infoRepository.create(payload as any);
    const info = this.infoRepository.createQueryBuilder('inf')
    .where(filter.cargoId ? `cargo_id = ${filter.cargoId}` : '1')
    .andWhere(filter.typeCategoriaId ? `type_categoria_id = ${filter.typeCategoriaId}` : '1')
    .andWhere(filter.metaId ? `meta_id = ${filter.metaId}` : '1')
    .update(createEntity);
    if (filter.ids.length) info.andWhereInIds(filter.ids);
    // executar
    await info.execute();
    // result
    return { process: true }
  }
}