import { EntityRepository, Repository } from "typeorm";
import { MetaEntity } from "./meta.entity";

@EntityRepository(MetaEntity) 
export class MetaRepository extends Repository<MetaEntity> {}