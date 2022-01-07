import { Injectable } from "@nestjs/common";
import { PaginateDto } from "src/common/dto/paginate.dto";
import { AfpRepository } from "../domain/afp.repository";

@Injectable()
export class AfpsService {
  constructor(private afpRepository: AfpRepository) { }
  
  public async getAfps(paginate: PaginateDto) {
    const queryBuilder = this.afpRepository.createQueryBuilder('a');
    return await this.afpRepository.paginate(queryBuilder, paginate);
  }
}