import { Injectable } from "@nestjs/common";
import { PaginateCollection } from "../../../common/utils/collection-entity";
import { RemunerationEntity } from "../domain/remuneration.entity";
import { RemunerationRepository } from "../domain/remuneration.repository";
import { GetRemunerationsDto } from "./dtos/filter-remunerations.dto";

@Injectable()
export class RemunerationsService {
  constructor(private remunerationRepository: RemunerationRepository) {}

  public async getRemunerations(paginate: GetRemunerationsDto): Promise<PaginateCollection<RemunerationEntity>> {
    const queryBuilder = this.remunerationRepository.createQueryBuilder('r')
      .innerJoinAndSelect('r.historial', 'h')
      .innerJoinAndSelect('r.typeRemuneration', 't')
      .orderBy('t.code', 'ASC')
    if (paginate.historialId) queryBuilder.where("historialId = :historialId", paginate);
    if (paginate.typeRemunerationId) queryBuilder.andWhere("typeRemunerationId = :typeRemuneration", paginate);
    return await this.remunerationRepository.paginate(queryBuilder, paginate);
  }
}