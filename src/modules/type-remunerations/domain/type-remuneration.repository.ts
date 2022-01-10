import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { TypeRemunerationEntity } from './type-remuneration.entity';

@EntityRepository(TypeRemunerationEntity)
export class TypeRemunerationRepository extends Repository<TypeRemunerationEntity> {
  public paginate(
    queryBuilder: SelectQueryBuilder<TypeRemunerationEntity>,
    options: IPaginationOptions): Promise<Pagination<TypeRemunerationEntity>> {
    return paginate<TypeRemunerationEntity>(queryBuilder, options);
  }
}