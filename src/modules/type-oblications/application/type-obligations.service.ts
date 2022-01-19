import { Injectable } from "@nestjs/common";
import { AuthHttpService } from "../../../client-http/application/auth-http.service";
import { TypeObligationRepository } from "../domain/type-obligation.repository";
import { GetTypeObligationsDto } from "./dtos/filter-obligations.dto";

@Injectable()
export class TypeObligationsService {
  constructor(
    private authHttpsService: AuthHttpService,
    private typeObligationRepository: TypeObligationRepository) { }
  
  public async getTypeObligations(paginate: GetTypeObligationsDto) {
    const queryBuilder = this.typeObligationRepository.createQueryBuilder('to')
      .innerJoinAndSelect('to.info', 'i')
      .innerJoinAndSelect('to.typeDiscount', 't');
    // filters
    if (paginate.infoId) queryBuilder.andWhere('i.id = :infoId', paginate);
    if (paginate.ids) queryBuilder.andWhereInIds(paginate.ids);
    // result
    const result = await this.typeObligationRepository.paginate(queryBuilder, paginate);
    // people
    for (const item of result.items) {
      item.person = await this.authHttpsService
        .findPerson(item.personId);
    }
    // response
    return result;
  }
}