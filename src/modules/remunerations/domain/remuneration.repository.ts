import { EntityRepository, Repository } from "typeorm";
import { RemunerationEntity } from "./remuneration.entity";

@EntityRepository(RemunerationEntity)
export class RemunerationRepository extends Repository<RemunerationEntity> {}