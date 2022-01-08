import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InfoRepository } from '../domain/info.repository';
import { CreateInfoDto } from "./dtos/create-info.dto";
import { EditInfoDto } from "./dtos/edit-info.dto";
import { GetInfosDto } from './dtos/filtros-infos.dto';

@Injectable()
export class InfosService {
  constructor(private infoRepository: InfoRepository) { }

  public async getInfos(filters: GetInfosDto) {
    const queryBuilder = this.infoRepository.createQueryBuilder('i')
      .innerJoinAndSelect('i.contract', 'c')
      .innerJoinAndSelect('i.bank', 'b')
      .innerJoinAndSelect('i.planilla', 'pla')
      .innerJoinAndSelect('i.pim', 'p');
    if (filters.contractId) 
    return await this.infoRepository.paginate(queryBuilder, filters);
  }

  public async createInfo(createInfo: CreateInfoDto) { 
    try {
      const newInfo = this.infoRepository.create(createInfo);
      return await this.infoRepository.save(newInfo);
    } catch (error) {
      throw new InternalServerErrorException;
    }
  }
  
  public async editInfo(id: number, editInfoDto: EditInfoDto) { 
    try {
      const info = await this.infoRepository.findOneOrFail(id);
      const partial = Object.assign(info, editInfoDto);
      return await this.infoRepository.save(partial);
    } catch (error) {
      throw new InternalServerErrorException;
    }
  }
}