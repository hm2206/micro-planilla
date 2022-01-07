import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { TypeCategoryEntity } from "./type-category.entity";

@EntityRepository(TypeCategoryEntity)
export class TypeCategoryRepository extends Repository<TypeCategoryEntity> {
  public paginate(
    queryBuilder: SelectQueryBuilder<TypeCategoryEntity>,
    options: IPaginationOptions): Promise<Pagination<TypeCategoryEntity>> {
    return paginate<TypeCategoryEntity>(queryBuilder, options);
  }
}