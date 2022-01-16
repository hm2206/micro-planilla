import { EntityRepository, Repository } from "typeorm";
import { AffiliationEntity } from "./affiliation.entity";

@EntityRepository(AffiliationEntity)
export class AffiliationRepository extends Repository<AffiliationEntity> {}