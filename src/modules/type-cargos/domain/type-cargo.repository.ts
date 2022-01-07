import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { TypeCargoEntity } from "./type-cargo.entity";

@EntityRepository(TypeCargoEntity)
export class TypeCargoRepository extends Repository<TypeCargoEntity> {
  public paginate(
    queryBuilder: SelectQueryBuilder<TypeCargoEntity>,
    options: IPaginationOptions): Promise<Pagination<TypeCargoEntity>> {
    return paginate<TypeCargoEntity>(queryBuilder, options);
  }
}