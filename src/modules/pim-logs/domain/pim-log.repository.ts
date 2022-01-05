import { EntityRepository, Repository } from "typeorm";
import { PimLogEntity } from "./pim-log.entity";

@EntityRepository(PimLogEntity)
export class PimLogRepository extends Repository<PimLogEntity> {}