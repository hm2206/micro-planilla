import { IPaginationOptions, paginate } from "nestjs-typeorm-paginate";
import { PaginateCollection } from "src/common/utils/collection-entity";
import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import { DiscountEntity } from "./discount.entity";

@EntityRepository(DiscountEntity)
export class DiscountRepository extends Repository<DiscountEntity> {
  public async paginate(
    queryBuilder: SelectQueryBuilder<DiscountEntity>,
    options: IPaginationOptions): Promise<PaginateCollection<DiscountEntity>> {
    const result = await paginate<DiscountEntity>(queryBuilder, options);
    return new PaginateCollection(result);
  }
}