import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InfoTypeRemunerationRepository } from "../domain/info-type-remuneration.repository";
import { CreateInfoTypeRemunerationDto } from "./dtos/create-info-type-remuneration.dto";
import { EditInfoTypeRemunerationDto } from "./dtos/edit-info-type-remuneration.dto";
import { GetInfoTypeRemunerations } from "./dtos/filters-info-type-remuneration.dto";

@Injectable()
export class InfoTypeRemunerationsService {
  constructor(private infoTypeRemunerationRepository: InfoTypeRemunerationRepository) { }
  
  public async getInfoTypeRemunerations(paginate: GetInfoTypeRemunerations) {
    const queryBuilder = this.infoTypeRemunerationRepository.createQueryBuilder('ir')
      .innerJoinAndSelect('ir.info', 'i')
      .innerJoinAndSelect('ir.typeRemuneration', 'r')
      .orderBy('r.code', 'ASC')
    if (paginate.infoId) queryBuilder.andWhere(`infoId = :infoId`, paginate);
    return await this.infoTypeRemunerationRepository.paginate(queryBuilder, paginate);
  }

  public async createInfoTypeRemuneration(payload: CreateInfoTypeRemunerationDto) {
    try {
      const newInfoTypeRemuneration = this.infoTypeRemunerationRepository.create(payload);
      return await this.infoTypeRemunerationRepository.save(newInfoTypeRemuneration);
    } catch (error) {
      throw new InternalServerErrorException;
    }
  }

  public async editInfoTypeRemuneration(id: number, payload: EditInfoTypeRemunerationDto) {
    try {
      const infoTypeRemuneration = await this.infoTypeRemunerationRepository
        .findOneOrFail(id);
      const partial = Object.assign(infoTypeRemuneration, payload);
      return await this.infoTypeRemunerationRepository.save(partial);
    } catch (error) {
      throw new InternalServerErrorException;
    }
  }

  public async deleteInfoTypeRemuneration(id: number) {
    try {
      await this.infoTypeRemunerationRepository.delete(id);
      return { process: true };
    } catch (error) {
      throw new InternalServerErrorException;
    }
  }
}