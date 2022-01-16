import {
  EntityRepository,
  Repository,
  SelectQueryBuilder
} from "typeorm";
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { TypeAffiliationEntity } from "./type-affiliation.entity";

@EntityRepository(TypeAffiliationEntity)
export class TypeAffiliationRepository extends Repository<TypeAffiliationEntity> {
  public paginate(
    queryBuilder: SelectQueryBuilder<TypeAffiliationEntity>,
    options: IPaginationOptions): Promise<Pagination<TypeAffiliationEntity>> {
    return paginate<TypeAffiliationEntity>(queryBuilder, options);
  }
}