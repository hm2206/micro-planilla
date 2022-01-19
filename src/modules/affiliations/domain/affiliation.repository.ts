import {
  EntityRepository,
  Repository,
  SelectQueryBuilder
} from "typeorm";
import {
  paginate,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { AffiliationEntity } from "./affiliation.entity";
import { PaginateCollection } from "../../../common/utils/collection-entity";

@EntityRepository(AffiliationEntity)
export class AffiliationRepository extends Repository<AffiliationEntity> {
  public async paginate(
    queryBuilder: SelectQueryBuilder<AffiliationEntity>,
    options: IPaginationOptions): Promise<PaginateCollection<AffiliationEntity>> {
    const result = await paginate<AffiliationEntity>(queryBuilder, options);
    return new PaginateCollection(result);
  }
}