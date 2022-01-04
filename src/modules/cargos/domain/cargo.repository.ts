import { EntityRepository, Repository } from "typeorm";
import { CargoEntity } from "./cargo.entity";

@EntityRepository(CargoEntity) 
export class CargoRepository extends Repository<CargoEntity> {}