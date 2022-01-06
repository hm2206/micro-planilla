import { EntityRepository, Repository } from "typeorm";
import { BankEntity } from "./bank.entity";

@EntityRepository(BankEntity)
export class BankRepository extends Repository<BankEntity> {}