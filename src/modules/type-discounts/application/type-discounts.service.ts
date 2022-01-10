import { Injectable } from "@nestjs/common";
import { PaginateDto } from "../../../common/dto/paginate.dto";
import { TypeDiscountRepository } from "../domain/type-discount.repository";

@Injectable()
export class TypeDiscountsService {
  constructor(private typeDiscountRepository: TypeDiscountRepository) { }

  public async getDiscounts(paginate: PaginateDto) { 
    const queryBuilder = this.typeDiscountRepository.createQueryBuilder('t')
      .orderBy('t.code', 'ASC');
    return await this.typeDiscountRepository.paginate(queryBuilder, paginate);
  }
}