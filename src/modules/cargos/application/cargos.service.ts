import { Injectable } from "@nestjs/common";
import { PaginateDto } from "src/common/dto/paginate.dto";
import { CargoRepository } from "../domain/cargo.repository";

@Injectable()
export class CargosService {
  constructor(private cargoRepository: CargoRepository) { }
  
  public async getCargos(paginate: PaginateDto) {
    const queryBuilder = this.cargoRepository.createQueryBuilder('car');
    return await this.cargoRepository.paginate(queryBuilder, paginate);
  }

  public async findCargo(id: number) {
    return await this.cargoRepository.findOneOrFail(id);
  }
}