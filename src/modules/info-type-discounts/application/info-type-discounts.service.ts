import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InfoTypeDiscountRepository } from "../domain/info-type-discount.repository";
import { CreateInfoTypeDiscountDto } from "./dtos/create-info-type-discount.dto";
import { EditInfoTypeDiscountDto } from "./dtos/edit-info-type-discount.dto";
import { GetInfoTypeDiscount } from "./dtos/filter-info-type-discount.dto";

@Injectable()
export class InfoTypeDiscountsService {
  constructor(private infoTypeDiscountRepository: InfoTypeDiscountRepository) { }

  public async getInfoTypeDiscounts(paginate: GetInfoTypeDiscount) {
    const queryBuilder = this.infoTypeDiscountRepository.createQueryBuilder('it')
      .innerJoinAndSelect('it.info', 'i')
      .innerJoinAndSelect('it.typeDiscount', 't');
    if (paginate.infoId) queryBuilder.andWhere('infoId = :infoId', paginate);
    if (paginate.typeDiscountId) queryBuilder.andWhere('typeDiscountId = :typeDiscountId', paginate);
    return await this.infoTypeDiscountRepository.paginate(queryBuilder, paginate);
  }

  public async createInfoTypeDiscount(payload: CreateInfoTypeDiscountDto) {
    try {
      const newInfoTypeDiscount = this.infoTypeDiscountRepository.create(payload);
      return await this.infoTypeDiscountRepository.save(newInfoTypeDiscount);
    } catch (error) {
      throw new InternalServerErrorException;
    }
  }

  public async editInfoTypeDiscount(id: number, payload: EditInfoTypeDiscountDto) {
    try {
      const infoTypeDiscount = await this.infoTypeDiscountRepository.findOneOrFail(id);
      const parcial = Object.assign(infoTypeDiscount, payload);
      return await this.infoTypeDiscountRepository.save(parcial);
    } catch (error) {
      throw new InternalServerErrorException;
    }
  }

  public async deleteInfoTypeDiscount(id: number) {
    try {
      await this.infoTypeDiscountRepository.delete(id);
      return { process: true }
    } catch (error) {
      throw new InternalServerErrorException;
    }
  }
}