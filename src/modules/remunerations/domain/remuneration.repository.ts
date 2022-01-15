import { IPaginationOptions, paginate } from "nestjs-typeorm-paginate";
import { PaginateCollection } from "../../../common/utils/collection-entity";
import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import { RemunerationEntity } from "./remuneration.entity";

@EntityRepository(RemunerationEntity)
export class RemunerationRepository extends Repository<RemunerationEntity> {
  public async paginate(
    queryBuilder: SelectQueryBuilder<RemunerationEntity>,
    options: IPaginationOptions): Promise<PaginateCollection<RemunerationEntity>> {
    const result = await paginate<RemunerationEntity>(queryBuilder, options);
    return new PaginateCollection(result);
  }

  public scopeIsBase(isBase: boolean) {
    return this.createQueryBuilder('r').where(`r.isBase = ${isBase}`);
  }
}