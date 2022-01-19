import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { DependencyEntity } from "./dependency.entity";

@EntityRepository(DependencyEntity)
export class DependencyRepository extends Repository<DependencyEntity> {
  public paginate(
    queryBuilder: SelectQueryBuilder<DependencyEntity>,
    options: IPaginationOptions): Promise<Pagination<DependencyEntity>> {
    return paginate<DependencyEntity>(queryBuilder, options);
  }
}