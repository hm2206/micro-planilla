import { EntityRepository, Repository } from "typeorm";
import { TypeDiscountEntity } from "./type-discount.entity";

@EntityRepository(TypeDiscountEntity)
export class TypeDiscountRepository extends Repository<TypeDiscountEntity> {}