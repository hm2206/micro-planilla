import { Injectable } from "@nestjs/common";
import { TypeObligationsService } from "src/modules/type-oblications/application/type-obligations.service";
import { ObligationRepository } from "../domain/obligation.repository";
import { GetObligationsDto } from "./dtos/filter-obligations.dto";

@Injectable()
export class ObligationsService {
  constructor(
    private typeObligationsService: TypeObligationsService,
    private obligationRepository: ObligationRepository) { }
  
  public async getObligations(paginate: GetObligationsDto) {
    const queryBuilder = this.obligationRepository.createQueryBuilder('o')
      .innerJoinAndSelect('o.discount', 'd')
      .innerJoin('o.typeObligation', 'to')
      .orderBy('to.orderBy', 'ASC')
    if (paginate.historialId) queryBuilder.andWhere(`d.historialId = :historialId`, paginate);
    // result
    const result = await this.obligationRepository
      .paginate(queryBuilder, paginate);
    // obtener type obligations
    const typeObligationIds: number[] = result.items
      .pluck('typeObligationId').toArray();
    const typeObligations = await this.typeObligationsService.getTypeObligations({
      ...paginate,
      ids: typeObligationIds
    });
    // settings
    await result.items.map(item => {
      const typeObligation = typeObligations.items
        .where("id", item.typeObligationId).first();
      item.typeObligation = typeObligation;
      return item;
    });
    // response
    return result;
  }
}