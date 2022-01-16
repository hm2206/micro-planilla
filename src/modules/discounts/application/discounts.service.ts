import { Injectable } from "@nestjs/common";
import { DiscountRepository } from "../domain/discount.repository";
import { GetCalcDiscountDto, GetDiscountsDto } from "./dtos/filter-discounts.dto";
import { HistorialDiscountObject } from "./objects/historial-discount.object";

@Injectable()
export class DiscountsService {
  constructor(private discountRepository: DiscountRepository) { }
  
  public async getDiscounts(paginate: GetDiscountsDto) {
    const queryBuilder = this.discountRepository.createQueryBuilder('d')
      .innerJoinAndSelect('d.historial', 'h')
      .innerJoinAndSelect('d.typeDiscount', 't')
      .orderBy('t.code', 'ASC')
    if (paginate.historialId) queryBuilder.andWhere('h.id = :historialId', paginate);
    if (paginate.typeDiscountId) queryBuilder.andWhere('t.id = :typeDiscountId', paginate);
    // response
    return await this.discountRepository.paginate(queryBuilder, paginate);
  }

  public async getCalcDiscount(paginate: GetCalcDiscountDto):
    Promise<HistorialDiscountObject[]> {
    const queryBuilder = this.discountRepository.createQueryBuilder('d')
      .innerJoin('d.historial', 'h')
      .select('h.id', 'historialId')
      .addSelect('sum(d.amount)', 'amount')
      .groupBy('h.id')
    // filtros 
    if (paginate.historialId) queryBuilder.andWhere('h.id = :historialId', paginate);
    // response
    return await queryBuilder.getRawMany();
  }
}