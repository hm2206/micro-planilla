import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { InfoTypeRemunerationEntity } from "./info-type-remuneration.entity";

@EntityRepository(InfoTypeRemunerationEntity)
export class InfoTypeRemunerationRepository extends Repository<InfoTypeRemunerationEntity> {
  public paginate(
    queryBuilder: SelectQueryBuilder<InfoTypeRemunerationEntity>,
    options: IPaginationOptions): Promise<Pagination<InfoTypeRemunerationEntity>> {
    return paginate<InfoTypeRemunerationEntity>(queryBuilder, options);
  }
}