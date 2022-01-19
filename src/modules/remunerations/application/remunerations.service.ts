import { Injectable } from "@nestjs/common";
import { PaginateCollection } from "../../../common/utils/collection-entity";
import { RemunerationEntity } from "../domain/remuneration.entity";
import { RemunerationRepository } from "../domain/remuneration.repository";
import { GetCalcBase, GetCalcTotal, GetRemunerationsDto } from "./dtos/filter-remunerations.dto";
import { HistorialRemunerationObject } from "./objects/historial-remuneration.object";

@Injectable()
export class RemunerationsService {
  constructor(private remunerationRepository: RemunerationRepository) {}

  public async getRemunerations(paginate: GetRemunerationsDto):
    Promise<PaginateCollection<RemunerationEntity>> {
    const queryBuilder = this.remunerationRepository.createQueryBuilder('r')
      .innerJoinAndSelect('r.historial', 'h')
      .innerJoinAndSelect('r.typeRemuneration', 't')
      .orderBy('t.code', 'ASC')
    if (paginate.historialId) queryBuilder.where("historialId = :historialId", paginate);
    if (paginate.typeRemunerationId) queryBuilder.andWhere("typeRemunerationId = :typeRemuneration", paginate);
    return await this.remunerationRepository.paginate(queryBuilder, paginate);
  }

  public async getCalcTotal(filter: GetCalcTotal):
    Promise<HistorialRemunerationObject[]>  {
    const queryBuilder = this.remunerationRepository.createQueryBuilder('r')
      .innerJoin('r.historial', 'h')
      .select('h.id', 'historialId')
      .addSelect('sum(r.amount)', 'amount')
      .groupBy('h.id')
    // filters
    if (filter.historialId) queryBuilder.where(`h.id = :historialId`, filter);
    // response
    return await queryBuilder.getRawMany();
  }

  public async getCalcIsBase(filter: GetCalcBase):
    Promise<HistorialRemunerationObject[]> {
    const queryBuilder = this.remunerationRepository.scopeIsBase(true)
      .innerJoin('r.historial', 'h')
      .select('h.id', 'historialId')
      .addSelect('sum(r.amount)', 'amount')
      .groupBy('h.id')
    // filtros
    if (filter.historialId) queryBuilder.andWhere(`h.id = :historialId`, filter);
    // response
    return await queryBuilder.getRawMany();
  }
}