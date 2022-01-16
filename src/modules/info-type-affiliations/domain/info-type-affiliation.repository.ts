import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { InfoTypeAffiliationEntity } from "./info-type-affiliation.entity";

@EntityRepository(InfoTypeAffiliationEntity) 
export class InfoTypeAffiliationRepository extends Repository<InfoTypeAffiliationEntity> {
  public paginate(
    queryBuilder: SelectQueryBuilder<InfoTypeAffiliationEntity>,
    options: IPaginationOptions): Promise<Pagination<InfoTypeAffiliationEntity>> {
    return paginate<InfoTypeAffiliationEntity>(queryBuilder, options);
  }
}