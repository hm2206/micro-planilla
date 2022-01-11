import { EntityRepository, Repository } from "typeorm";
import { DetailEntity } from "./detail.entity";

@EntityRepository(DetailEntity)
export class DetailRepository extends Repository<DetailEntity> {}