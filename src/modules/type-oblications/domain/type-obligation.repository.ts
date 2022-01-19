import {
  EntityRepository,
  Repository,
  SelectQueryBuilder
} from "typeorm";
import {
  paginate,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { TypeObligationEntity } from "./type-obligation.entity";
import { PaginateCollection } from "../../../common/utils/collection-entity";

@EntityRepository(TypeObligationEntity)
export class TypeObligationRepository extends Repository<TypeObligationEntity> {
  public async paginate(
    queryBuilder: SelectQueryBuilder<TypeObligationEntity>,
    options: IPaginationOptions): Promise<PaginateCollection<TypeObligationEntity>> {
    const result = await paginate<TypeObligationEntity>(queryBuilder, options);
    return new PaginateCollection(result);
  }
}