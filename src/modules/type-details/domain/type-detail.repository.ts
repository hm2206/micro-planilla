import { EntityRepository, Repository } from "typeorm";
import { TypeDetailEntity } from "./type-detail.entity";

@EntityRepository(TypeDetailEntity)
export class TypeDetailRepository extends Repository<TypeDetailEntity> {}