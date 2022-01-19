import { EntityRepository, Repository } from "typeorm";
import { ConfigTypeAportationEntity } from "./config-type-aportation.entity";

@EntityRepository(ConfigTypeAportationEntity)
export class ConfigTypeAportationRepository extends Repository<ConfigTypeAportationEntity> {}