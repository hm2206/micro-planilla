import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HistorialRepository } from '../domain/historial.repository';
import { FilterTypeObject, UpdateHistorial } from '../domain/historial.dto';
import { InfosService } from '../../../modules/infos/application/infos.service';
import { AddHistorialIdsProcedured } from '../domain/procedured/add-historial-ids.procedured';

@Injectable()
export class ProcessHistorialService {
  constructor(private historialRepository: HistorialRepository,
    private infosService: InfosService) {}

  public async createMassive(cronogramaId: number, infoIds: number[]) {
    await (new AddHistorialIdsProcedured()).call(cronogramaId, infoIds);
    return { process: true }
  } 
  
  public async updateMassive(filter: FilterTypeObject, payload: UpdateHistorial, updateInfo = false){
    
    // result
    return { process: true };
  }

  public async deleteMassive(filter: FilterTypeObject) {
    try {
      const queryBuilder = this.historialRepository.createQueryBuilder().delete()
      if (filter.ids) queryBuilder.andWhereInIds(filter.ids);
      if (filter.cronogramaId) queryBuilder.andWhere("cronogramaId = :cronogramaId", filter);
      if (filter.pimId) queryBuilder.andWhere("pimId = :pimId", filter);
      const { affected } = await queryBuilder.execute();
      return { affected };
    } catch (error) {
      throw new InternalServerErrorException;
    }
  }
}