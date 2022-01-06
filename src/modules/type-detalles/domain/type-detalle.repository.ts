import { EntityRepository, Repository } from "typeorm";
import { TypeDetalleEntity } from "./type-detalle.entity";

@EntityRepository(TypeDetalleEntity)
export class TypeDetalleRepository extends Repository<TypeDetalleEntity> {}