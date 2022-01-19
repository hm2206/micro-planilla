import {
  EntityRepository,
  Repository,
  SelectQueryBuilder
} from "typeorm";
import {
  paginate,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { ObligationEntity } from "./obligation.entity";
import { PaginateCollection } from "../../../common/utils/collection-entity";

@EntityRepository(ObligationEntity)
export class ObligationRepository extends Repository<ObligationEntity> {
  public async paginate(
    queryBuilder: SelectQueryBuilder<ObligationEntity>,
    options: IPaginationOptions): Promise<PaginateCollection<ObligationEntity>> {
    const result = await paginate<ObligationEntity>(queryBuilder, options);
    return new PaginateCollection(result);
  }
}