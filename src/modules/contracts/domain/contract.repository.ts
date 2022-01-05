import { EntityRepository, Repository } from "typeorm";
import { ContractEntity } from "./contract.entity";

@EntityRepository(ContractEntity)
export class ContractRepository extends Repository<ContractEntity> {}