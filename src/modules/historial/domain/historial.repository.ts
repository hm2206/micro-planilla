import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { PaginateCollection } from 'src/common/utils/collection-entity';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { HistorialEntity } from './historial.entity';

@EntityRepository(HistorialEntity)
export class HistorialRepository extends Repository<HistorialEntity> {
  public async paginate(
    queryBuilder: SelectQueryBuilder<HistorialEntity>,
    options: IPaginationOptions): Promise<PaginateCollection<HistorialEntity>> {
    const result = await paginate<HistorialEntity>(queryBuilder, options);
    return new PaginateCollection(result);
  }
}