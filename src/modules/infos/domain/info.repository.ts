import {
  EntityRepository,
  Repository,
  SelectQueryBuilder
} from "typeorm";
import {
  paginate,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { InfoEntity } from './info.entity';
import { PaginateCollection } from "src/common/utils/collection-entity";

@EntityRepository(InfoEntity)
export class InfoRepository extends Repository<InfoEntity> {
  public async paginate(
    queryBuilder: SelectQueryBuilder<InfoEntity>,
    options: IPaginationOptions): Promise<PaginateCollection<InfoEntity>> {
    const result = await paginate<InfoEntity>(queryBuilder, options);
    return new PaginateCollection(result);
  }
}