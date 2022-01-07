import { Injectable } from "@nestjs/common";
import { PaginateDto } from "src/common/dto/paginate.dto";
import { TypeCargoRepository } from "../domain/type-cargo.repository";

@Injectable()
export class TypeCargosService {
  constructor(private typeCargoRepository: TypeCargoRepository) { }
  
  public getTypeCargos(paginate: PaginateDto) {
    const queryBuilder = this.typeCargoRepository.createQueryBuilder('t');
    return this.typeCargoRepository.paginate(queryBuilder, paginate);
  }
}