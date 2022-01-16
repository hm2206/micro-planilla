import {
  EntityRepository,
  Repository,
  SelectQueryBuilder
} from "typeorm";
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { InfoEntity } from './info.entity';

@EntityRepository(InfoEntity)
export class InfoRepository extends Repository<InfoEntity> {
  public paginate(
    queryBuilder: SelectQueryBuilder<InfoEntity>,
    options: IPaginationOptions): Promise<Pagination<InfoEntity>> {
    return paginate<InfoEntity>(queryBuilder, options);
  }
}