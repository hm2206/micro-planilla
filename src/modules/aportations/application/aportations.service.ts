import { Injectable } from "@nestjs/common";
import { AportationRepository } from "../domain/aportation.repository";
import { GetAportationsDto, GetCalcAportationDto } from "./dtos/filter-aportations.dto";
import { HistorialAportationObject } from "./objects/historial-aportation.object";

@Injectable()
export class AportationsService {
  constructor(private aportationRepository: AportationRepository) { }

  public async getAportations(paginate: GetAportationsDto) {
    const queryBuilder = this.aportationRepository.createQueryBuilder('a')
      .innerJoinAndSelect('a.historial', 'h')
      .innerJoinAndSelect('a.typeAportation', 't')
    if (paginate.historialId) queryBuilder.andWhere(`h.id = :historialId`, paginate);
    if (paginate.typeAportationId) queryBuilder.andWhere(`t.id = :typeAportationId`, paginate);
    return await this.aportationRepository.paginate(queryBuilder, paginate);
  }

  public async getCalcAportation(paginate: GetCalcAportationDto):
    Promise<HistorialAportationObject[]> {
    const queryBuilder = this.aportationRepository.createQueryBuilder('a')
      .innerJoin('a.historial', 'h')
      .select('h.id', 'historialId')
      .addSelect('sum(a.amount)', 'amount')
      .groupBy('h.id')
    // filtros 
    if (paginate.historialId) queryBuilder.andWhere('h.id = :historialId', paginate);
    // response
    return await queryBuilder.getRawMany();
  }
}