import { EntityRepository, Repository } from "typeorm";
import { ConfigTypeRemunerationEntity } from "./config-type-remuneration.entity";

@EntityRepository(ConfigTypeRemunerationEntity)
export class ConfigTypeRemunerationRepository extends Repository<ConfigTypeRemunerationEntity> {}