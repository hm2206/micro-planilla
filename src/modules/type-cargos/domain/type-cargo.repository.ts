import { EntityRepository, Repository } from "typeorm";
import { TypeCargoEntity } from "./type-cargo.entity";

@EntityRepository(TypeCargoEntity)
export class TypeCargoRepository extends Repository<TypeCargoEntity> {}