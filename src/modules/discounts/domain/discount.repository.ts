import { EntityRepository, Repository } from "typeorm";
import { DiscountEntity } from "./discount.entity";

@EntityRepository(DiscountEntity)
export class DiscountRepository extends Repository<DiscountEntity> {}