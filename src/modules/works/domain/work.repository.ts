import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { WorkEntity } from "./work.entity";

@EntityRepository(WorkEntity)
export class WorkRepository extends Repository<WorkEntity> {
  public paginate(
    queryBuilder: SelectQueryBuilder<WorkEntity>,
    options: IPaginationOptions): Promise<Pagination<WorkEntity>> {
    return paginate<WorkEntity>(queryBuilder, options);
  }
}