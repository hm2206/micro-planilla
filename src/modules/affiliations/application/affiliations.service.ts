import { Injectable } from "@nestjs/common";
import { AffiliationRepository } from "../domain/affiliation.repository";
import { GetAffiliationsDto } from "./dtos/filter-affiliations.dto";

@Injectable()
export class AffiliationsService {
  constructor(private affiliationRepository: AffiliationRepository) { }
  
  public async getAffiliations(paginate: GetAffiliationsDto) {
    const queryBuilder = this.affiliationRepository.createQueryBuilder('af')
      .innerJoinAndSelect('af.discount', 'dis')
      .innerJoinAndSelect('af.infoTypeAffiliation', 'it')
      .innerJoinAndSelect('dis.typeDiscount', 'td')
      .innerJoinAndSelect('it.typeAffiliation', 'ta');
    if (paginate.historialId) queryBuilder.andWhere('dis.historialId = :historialId', paginate);
    // response
    return await this.affiliationRepository.paginate(queryBuilder, paginate);
  }
}