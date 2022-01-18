import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PaginateDto } from "src/common/dto/paginate.dto";
import { InfoTypeAportationsService } from "src/modules/info-type-aportations/application/info-type-aportations.service";
import { InfoTypeDiscountsService } from "src/modules/info-type-discounts/application/info-type-discounts.service";
import { InfoTypeRemunerationsService } from "src/modules/info-type-remunerations/application/info-type-remunerations.service";
import { InfoRepository } from '../domain/info.repository';
import { CreateInfoDto } from "./dtos/create-info.dto";
import { EditInfoDto } from "./dtos/edit-info.dto";
import { GetInfosDto } from './dtos/filtros-infos.dto';

@Injectable()
export class InfosService {
  constructor(
    private infoTypeDiscountsService: InfoTypeDiscountsService,
    private infoTypeRemunerationsService: InfoTypeRemunerationsService,
    private infoTypeAportationsService: InfoTypeAportationsService,
    private infoRepository: InfoRepository) { }

  public async getInfos(filters: GetInfosDto) {
    const queryBuilder = this.infoRepository.createQueryBuilder('i')
      .innerJoinAndSelect('i.contract', 'c')
      .innerJoinAndSelect('i.bank', 'b')
      .innerJoinAndSelect('i.planilla', 'pla')
      .innerJoinAndSelect('i.pim', 'p');
    if (filters.contractId) queryBuilder.andWhere('i.contractId = :contractId', filters);
    if (filters.planillaId) queryBuilder.andWhere('i.planillaId = :planillaId', filters);
    if (filters.ids) queryBuilder.andWhereInIds(filters.ids);
    if (typeof filters.state != 'undefined') {
      const state = JSON.parse(`${filters.state}`);
      queryBuilder.andWhere(`i.state = ${state}`);
    }
    // response
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

  public async findInfo(id: number) {
    return await this.infoRepository.createQueryBuilder('inf')
      .innerJoinAndSelect('inf.contract', 'cont')
      .innerJoinAndSelect('inf.planilla', 'pla')
      .innerJoinAndSelect('inf.pim', 'pim')
      .where(`inf.id = ${id}`)
      .getOneOrFail();
  }

  public async findTypeRemunerations(id: number, paginate: PaginateDto) {
    const info = await this.infoRepository.findOneOrFail(id);
    return await this.infoTypeRemunerationsService.getInfoTypeRemunerations({
      ...paginate,
      infoId: info.id
    })
  }

  public async findTypeDiscounts(id: number, paginate: PaginateDto) {
    const info = await this.infoRepository.findOneOrFail(id);
    return await this.infoTypeDiscountsService.getInfoTypeDiscounts({
      ...paginate,
      infoId: info.id
    });
  }

  public async findTypeAportations(id: number, paginate: PaginateDto) {
    const info = await this.infoRepository.findOneOrFail(id);
    return await this.infoTypeAportationsService.getInfoTypeAportation({
      ...paginate,
      infoId: info.id
    });
  }
}