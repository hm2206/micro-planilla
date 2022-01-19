import { Injectable } from "@nestjs/common";
import { PaginateDto } from "../../../common/dto/paginate.dto";
import { HourhandRepository } from "../domain/hourhand.repository";

@Injectable()
export class HourhandsService {
  constructor(private hourhandRepository: HourhandRepository) { }
  
  public async getHourhands(paginate: PaginateDto) {
    const queryBuilder = this.hourhandRepository.createQueryBuilder('h');
    return await this.hourhandRepository.paginate(queryBuilder, paginate);
  }
}