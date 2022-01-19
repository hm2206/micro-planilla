import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { ProfileEntity } from "./profile.entity";

@EntityRepository(ProfileEntity)
export class ProfileRepository extends Repository<ProfileEntity> {
  public paginate(
    queryBuilder: SelectQueryBuilder<ProfileEntity>,
    options: IPaginationOptions): Promise<Pagination<ProfileEntity>> {
    return paginate<ProfileEntity>(queryBuilder, options);
  }
}