import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { ContractEntity } from "./contract.entity";

@EntityRepository(ContractEntity)
export class ContractRepository extends Repository<ContractEntity> {
  public paginate(
    queryBuilder: SelectQueryBuilder<ContractEntity>,
    options: IPaginationOptions): Promise<Pagination<ContractEntity>> {
    return paginate<ContractEntity>(queryBuilder, options);
  }
}