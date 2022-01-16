import { Injectable } from "@nestjs/common";
import { InfoTypeAffiliationRepository } from "../domain/info-type-affiliation.repository";
import { GetInfoTypeAffiliationsDto } from "./dtos/filter-info-type-affiliations.dto";

@Injectable()
export class InfoTypeAffiliationsService {
  constructor(private infoTypeAffiliationRepository: InfoTypeAffiliationRepository) { }
  
  public async getInfoTypeAffiliations(paginate: GetInfoTypeAffiliationsDto) {
    const queryBuilder = this.infoTypeAffiliationRepository.createQueryBuilder('it')
      .innerJoinAndSelect('it.typeAffiliation', 't')
      .innerJoinAndSelect('it.info', 'i');
    if (paginate.infoId) queryBuilder.andWhere('i.id = :infoId', paginate); 
    // response
    return await this.infoTypeAffiliationRepository.paginate(queryBuilder, paginate);
  }
}