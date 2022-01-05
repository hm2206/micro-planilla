import { Injectable } from "@nestjs/common";
import { CargoRepository } from "../domain/cargo.repository";

@Injectable()
export class CargosService {
  constructor(private cargoRepository: CargoRepository) { }
  
  public async findCargo(id: number) {
    return await this.cargoRepository.findOneOrFail(id);
  }
}