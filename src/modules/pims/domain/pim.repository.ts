import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { PimEntity } from "./pim.entity";

@EntityRepository(PimEntity)
export class PimRepository extends Repository<PimEntity> {
  public paginate(
    queryBuilder: SelectQueryBuilder<PimEntity>,
    options: IPaginationOptions): Promise<Pagination<PimEntity>> {
    return paginate<PimEntity>(queryBuilder, options);
  }
}