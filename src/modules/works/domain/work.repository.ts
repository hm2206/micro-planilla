import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import {
  paginate,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { WorkEntity } from "./work.entity";
import { PaginateCollection } from "src/common/utils/collection-entity";

@EntityRepository(WorkEntity)
export class WorkRepository extends Repository<WorkEntity> {
  public async paginate(
    queryBuilder: SelectQueryBuilder<WorkEntity>,
    options: IPaginationOptions): Promise<PaginateCollection<WorkEntity>> {
    const result = await paginate<WorkEntity>(queryBuilder, options);
    return new PaginateCollection(result);
  }
}