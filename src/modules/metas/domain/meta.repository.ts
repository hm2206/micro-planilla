import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import {
  paginate,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { MetaEntity } from "./meta.entity";
import { PaginateCollection } from "src/common/utils/collection-entity";

@EntityRepository(MetaEntity) 
export class MetaRepository extends Repository<MetaEntity> {
  public async paginate(
    queryBuilder: SelectQueryBuilder<MetaEntity>,
    options: IPaginationOptions): Promise<PaginateCollection<MetaEntity>> {
    const result = await paginate<MetaEntity>(queryBuilder, options);
    return new PaginateCollection(result);
  }
}