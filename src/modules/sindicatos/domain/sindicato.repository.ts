import { EntityRepository, Repository } from "typeorm";
import { SindicatoEntity } from "./sindicato.entity";

@EntityRepository(SindicatoEntity)
export class SindicatoRepository extends Repository<SindicatoEntity> {}