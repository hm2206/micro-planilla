import { IPaginationOptions, paginate } from "nestjs-typeorm-paginate";
import { PaginateCollection } from "src/common/utils/collection-entity";
import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import { AportationEntity } from "./aportation.entity";

@EntityRepository(AportationEntity)
export class AportationRepository extends Repository<AportationEntity> {
  public async paginate(
    queryBuilder: SelectQueryBuilder<AportationEntity>,
    options: IPaginationOptions): Promise<PaginateCollection<AportationEntity>> {
    const result = await paginate<AportationEntity>(queryBuilder, options);
    return new PaginateCollection(result);
  }
}