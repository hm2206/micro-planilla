import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { InfoTypeDiscountEntity } from "./info-type-discount.entity";

@EntityRepository(InfoTypeDiscountEntity)
export class InfoTypeDiscountRepository extends Repository<InfoTypeDiscountEntity> {
  public paginate(
    queryBuilder: SelectQueryBuilder<InfoTypeDiscountEntity>,
    options: IPaginationOptions): Promise<Pagination<InfoTypeDiscountEntity>> {
    return paginate<InfoTypeDiscountEntity>(queryBuilder, options);
  }
}