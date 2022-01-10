import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { TypeSindicatoEntity } from "./type-sindicato.entity";

@EntityRepository(TypeSindicatoEntity)
export class TypeSindicatoRepository extends Repository<TypeSindicatoEntity> {
  public paginate(
    queryBuilder: SelectQueryBuilder<TypeSindicatoEntity>,
    options: IPaginationOptions): Promise<Pagination<TypeSindicatoEntity>> {
    return paginate<TypeSindicatoEntity>(queryBuilder, options);
  }
}