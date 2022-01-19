import { Injectable } from "@nestjs/common";
import { PaginateDto } from "src/common/dto/paginate.dto";
import { TypeAportationRepository } from "../domain/type-aportation.repository";

@Injectable()
export class TypeAportationsService {
  constructor(private typeAportationRepository: TypeAportationRepository) { }
  
  public async getAportations(paginate: PaginateDto) {
    const queryBuilder = this.typeAportationRepository.createQueryBuilder('t');
    return this.typeAportationRepository.paginate(queryBuilder, paginate);
  }
}