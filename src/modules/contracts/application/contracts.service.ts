import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PaginateDto } from "../../../common/dto/paginate.dto";
import { InfosService } from "../../../modules/infos/application/infos.service";
import { ContractRepository } from "../domain/contract.repository";
import { CreateContractDto } from "./dtos/create-contract.dto";
import { EditContractDto } from "./dtos/edit-contract.dto";
import { FilterContractDto, GetContractDto } from "./dtos/filters-contract.dto";

@Injectable()
export class ContractsService {
  constructor(
    private infosService: InfosService,
    private contractRepository: ContractRepository) { }

  public async getContracts(paginate: GetContractDto) {
    const queryBuilder = this.contractRepository.createQueryBuilder('c')
      .innerJoinAndSelect('c.work', 'w')
      .innerJoinAndSelect('c.dependency', 'd')
      .innerJoinAndSelect('c.profile', 'p')
      .innerJoinAndSelect('c.typeCategory', 't')
      .innerJoinAndSelect('c.hourhand', 'h')
      .orderBy('c.dateOfResolution', 'DESC');
    // filtros
    if (paginate.ids) queryBuilder.andWhereInIds(paginate.ids);
    if (paginate.workId) queryBuilder.andWhere(`c.workId = :workId`, paginate);
    if (paginate.state) {
      const state = JSON.parse(`${paginate.state}`);
      queryBuilder.andWhere(`c.state = :state`, { state });
    }
    // response
    return await this.contractRepository.paginate(queryBuilder, paginate);
  }

  public async createContract(createContractDto: CreateContractDto) {
    try {
      const newContract = this.contractRepository.create(createContractDto);
      return await this.contractRepository.save(newContract);
    } catch (error) {
      throw new InternalServerErrorException;
    }
  }

  public async findContract(id: number) {
    return await this.contractRepository.createQueryBuilder('c')
      .innerJoinAndSelect('c.work', 'w')
      .innerJoinAndSelect('c.dependency', 'd')
      .innerJoinAndSelect('c.profile', 'p')
      .innerJoinAndSelect('c.typeCategory', 't')
      .innerJoinAndSelect('c.hourhand', 'h')
      .where('c.id = :id', { id })
      .getOneOrFail();
  }

  public async editContract(id: number, editContractDto: EditContractDto) {
    try {
      const contract = await this.contractRepository.findOneOrFail(id);
      const parcial = Object.assign(contract, editContractDto);
      return await this.contractRepository.save(parcial);
    } catch (error) {
      throw new InternalServerErrorException;
    }
  }

  public async countContract(filter: FilterContractDto): Promise<number> {
    const queryBuilder = this.contractRepository.createQueryBuilder('c');
    if (filter.ids) queryBuilder.whereInIds(filter.ids);
    if (filter.workId) queryBuilder.andWhere(`c.workId = :workId`, filter);
    if (filter.state) queryBuilder.andWhere(`c.state = :state`, filter);
    // response
    return await queryBuilder.getCount();
  }

  public async findInfos(id: number, paginate: PaginateDto) {
    return await this.infosService.getInfos({
      ...paginate,
      contractId: id
    });
  }
}