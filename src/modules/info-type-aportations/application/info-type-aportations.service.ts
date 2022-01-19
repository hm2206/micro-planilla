import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InfoTypeAportationRepository } from "../domain/info-type-aportation.repository";
import { CreateInfoTypeAportationDto } from "../application/dtos/create-info-type-aportation.dto";
import { GetInfoTypeAportationDto } from "../application/dtos/filter-info-type-aportation.dto";


@Injectable()
export class InfoTypeAportationsService {
  constructor(private infoTypeAportationRepository: InfoTypeAportationRepository) {}

  public async getInfoTypeAportation(paginate: GetInfoTypeAportationDto) {
    const queryBuilder = this.infoTypeAportationRepository.createQueryBuilder('it')
      .innerJoinAndSelect('it.info', 'i')
      .innerJoinAndSelect('it.typeAportation', 't');
    if (paginate.infoId) queryBuilder.andWhere('infoId = :infoId', paginate);
    if (paginate.typeAportationId) queryBuilder.andWhere('typeAportationId = :typeAportationId', paginate);
    return await this.infoTypeAportationRepository.paginate(queryBuilder, paginate);
  }

  public async createInfoTypeAportation(payload: CreateInfoTypeAportationDto) {
    try {
      const newInfoTypeAportation = this.infoTypeAportationRepository.create(payload);
      return await this.infoTypeAportationRepository.save(newInfoTypeAportation);
    } catch (error) {
      throw new InternalServerErrorException;
    }
  }

  public async deleteInfoTypeAportation(id: number) {
    try {
      await this.infoTypeAportationRepository.delete(id);
      return { process: true }
    } catch (error) {
      throw new InternalServerErrorException;
    }
  }
}