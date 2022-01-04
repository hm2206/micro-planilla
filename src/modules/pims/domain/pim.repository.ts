import { EntityRepository, Repository } from "typeorm";
import { PimEntity } from "./pim.entity";

@EntityRepository(PimEntity)
export class PimRepository extends Repository<PimEntity> {}