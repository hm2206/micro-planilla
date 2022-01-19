import { EntityRepository, Repository } from "typeorm";
import { ConfigTypeDiscountEntity } from "./config-type-discount.entity";

@EntityRepository(ConfigTypeDiscountEntity)
export class ConfigTypeDiscountRepository extends Repository<ConfigTypeDiscountEntity> {}