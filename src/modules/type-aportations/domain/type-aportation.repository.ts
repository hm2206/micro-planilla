import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { TypeAportationEntity } from "./type-aportation.entity";

@EntityRepository(TypeAportationEntity)
export class TypeAportationRepository extends Repository<TypeAportationEntity> {
  public paginate(
    queryBuilder: SelectQueryBuilder<TypeAportationEntity>,
    options: IPaginationOptions): Promise<Pagination<TypeAportationEntity>> {
    return paginate<TypeAportationEntity>(queryBuilder, options);
  }
}