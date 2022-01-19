import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { InfoTypeAportationEntity } from "./info-type-aportation.entity";

@EntityRepository(InfoTypeAportationEntity)
export class InfoTypeAportationRepository extends Repository<InfoTypeAportationEntity> {
  public paginate(
    queryBuilder: SelectQueryBuilder<InfoTypeAportationEntity>,
    options: IPaginationOptions): Promise<Pagination<InfoTypeAportationEntity>> {
    return paginate<InfoTypeAportationEntity>(queryBuilder, options);
  }
}