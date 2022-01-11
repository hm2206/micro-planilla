import { EntityRepository, Repository } from "typeorm";
import { AportationEntity } from "./aportation.entity";

@EntityRepository(AportationEntity)
export class AportationRepository extends Repository<AportationEntity> {}