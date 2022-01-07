import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { HourhandEntity } from "./hourhand.entity";

@EntityRepository(HourhandEntity)
export class HourhandRepository extends Repository<HourhandEntity> {
  public paginate(
    queryBuilder: SelectQueryBuilder<HourhandEntity>,
    options: IPaginationOptions): Promise<Pagination<HourhandEntity>> {
    return paginate<HourhandEntity>(queryBuilder, options);
  }
}