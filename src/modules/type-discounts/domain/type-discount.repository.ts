import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { TypeDiscountEntity } from "./type-discount.entity";

@EntityRepository(TypeDiscountEntity)
export class TypeDiscountRepository extends Repository<TypeDiscountEntity> {
  public paginate(
    queryBuilder: SelectQueryBuilder<TypeDiscountEntity>,
    options: IPaginationOptions): Promise<Pagination<TypeDiscountEntity>> {
    return paginate<TypeDiscountEntity>(queryBuilder, options);
  }
}