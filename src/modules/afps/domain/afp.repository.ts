import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { AfpEntity } from "./afp.entity";

@EntityRepository(AfpEntity) 
export class AfpRepository extends Repository<AfpEntity> {
  public paginate(
    queryBuilder: SelectQueryBuilder<AfpEntity>,
    options: IPaginationOptions): Promise<Pagination<AfpEntity>> {
    return paginate<AfpEntity>(queryBuilder, options);
  }
}