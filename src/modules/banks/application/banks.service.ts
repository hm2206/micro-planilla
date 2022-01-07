import { Injectable } from "@nestjs/common";
import { PaginateDto } from "src/common/dto/paginate.dto";
import { BankRepository } from "../domain/bank.repository";

@Injectable()
export class BanksService {
  constructor(private bankRepository: BankRepository) { }
  
  public async getBanks(paginate : PaginateDto) {
    const queryBuilder = this.bankRepository.createQueryBuilder('b');
    return await this.bankRepository.paginate(queryBuilder, paginate);
  }
}