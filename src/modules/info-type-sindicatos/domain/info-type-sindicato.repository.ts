import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { InfoTypeSindicatoEntity } from "./info-type-sindicato.entity";

@EntityRepository(InfoTypeSindicatoEntity) 
export class InfoTypeSindicatoRepository extends Repository<InfoTypeSindicatoEntity> {
  public paginate(
    queryBuilder: SelectQueryBuilder<InfoTypeSindicatoEntity>,
    options: IPaginationOptions): Promise<Pagination<InfoTypeSindicatoEntity>> {
    return paginate<InfoTypeSindicatoEntity>(queryBuilder, options);
  }
}