import { EntityRepository, Repository } from "typeorm";
import { TypeAportationEntity } from "./type-aportation.entity";

@EntityRepository(TypeAportationEntity)
export class TypeAportationRepository extends Repository<TypeAportationEntity> {}