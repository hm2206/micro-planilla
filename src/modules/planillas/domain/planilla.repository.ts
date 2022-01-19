import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { PlanillaEntity } from './planilla.entity';

@EntityRepository(PlanillaEntity)
export class PlanillaRepository extends Repository<PlanillaEntity> {
  public paginate(
    queryBuilder: SelectQueryBuilder<PlanillaEntity>,
    options: IPaginationOptions): Promise<Pagination<PlanillaEntity>> {
    return paginate<PlanillaEntity>(queryBuilder, options);
  }
}