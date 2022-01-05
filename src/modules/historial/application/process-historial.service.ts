import { Injectable } from '@nestjs/common';
import { HistorialRepository } from '../domain/historial.repository';
import { FilterTypeObject, UpdateHistorial } from '../domain/historial.dto';
import { HistorialEntity } from '../domain/historial.entity';
import { Collection } from 'collect.js';
import { ProcessInfosService } from '../../infos/application/process-infos.service';

@Injectable()
export class ProcessHistorialService {
  constructor(private historialRepository: HistorialRepository,
    private processInfosService: ProcessInfosService) {}

  public async updateMassive(filter: FilterTypeObject, payload: UpdateHistorial, updateInfo = false){
    await this.historialRepository.createQueryBuilder()
    .where(filter.cronogramaId ? `cronograma_id = ${filter.cronogramaId}` : '1')
    .andWhere(filter.cargoId ? `cargo_id = ${filter.cargoId}` : '1')
    .andWhere(filter.typeCategoriaId ? `type_categoria_id = ${filter.typeCategoriaId}` : '1')
    .andWhere(filter.metaId ? `meta_id = ${filter.metaId}` : '1')
    .update(payload as HistorialEntity)
    .execute();
    // validar actualizar infos
    if (updateInfo) {
      // actualizar infos
      const historial = await this.historialRepository.createQueryBuilder('his')
      .where(filter.cronogramaId ? `his.cronograma_id = ${filter.cronogramaId}` : '1')
      .andWhere(filter.cargoId ? `his.cargo_id = ${filter.cargoId}` : '1')
      .andWhere(filter.typeCategoriaId ? `type_categoria_id = ${filter.typeCategoriaId}` : '1')
      .andWhere(filter.metaId ? `his.meta_id = ${filter.metaId}` : '1')
      .select('his.info_id as infoId')
      .getRawMany();
      // obtener ids
      const ids: any = new Collection(historial).pluck('infoId').toArray();
      const filterInfos = { ids };
      // actualizar infos
      await this.processInfosService.updateMassive(filterInfos, payload);
    }
    // result
    return { process: true };
  }
}