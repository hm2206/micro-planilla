import { EntityRepository, Repository } from "typeorm";
import { TypeObligationEntity } from "./type-obligation.entity";

@EntityRepository(TypeObligationEntity)
export class TypeObligationRepository extends Repository<TypeObligationEntity> {}