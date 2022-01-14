import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import {
  paginate,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { CargoEntity } from "./cargo.entity";
import { PaginateCollection } from "../../../common/utils/collection-entity";

@EntityRepository(CargoEntity) 
export class CargoRepository extends Repository<CargoEntity> {
  public async paginate(
    queryBuilder: SelectQueryBuilder<CargoEntity>,
    options: IPaginationOptions): Promise<PaginateCollection<CargoEntity>> {
    const result = await paginate<CargoEntity>(queryBuilder, options);
    return new PaginateCollection(result);
  }
}