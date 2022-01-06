import { EntityRepository, Repository } from "typeorm";
import { DependencyEntity } from "./dependency.entity";

@EntityRepository(DependencyEntity)
export class DependencyRepository extends Repository<DependencyEntity> {}