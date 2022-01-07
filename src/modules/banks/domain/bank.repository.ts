import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { BankEntity } from "./bank.entity";

@EntityRepository(BankEntity)
export class BankRepository extends Repository<BankEntity> {
  public paginate(
    queryBuilder: SelectQueryBuilder<BankEntity>,
    options: IPaginationOptions): Promise<Pagination<BankEntity>> {
    return paginate<BankEntity>(queryBuilder, options);
  }
}