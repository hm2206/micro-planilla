import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import {
  paginate,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { ContractEntity } from "./contract.entity";
import { PaginateCollection } from "src/common/utils/collection-entity";

@EntityRepository(ContractEntity)
export class ContractRepository extends Repository<ContractEntity> {
  public async paginate(
    queryBuilder: SelectQueryBuilder<ContractEntity>,
    options: IPaginationOptions): Promise<PaginateCollection<ContractEntity>> {
    const result = await paginate<ContractEntity>(queryBuilder, options);
    return new PaginateCollection(result);
  }
}