import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PaginateDto } from "../../../common/dto/paginate.dto";
import { AuthHttpService } from "../../../client-http/application/auth-http.service";
import { WorkEntity } from "../domain/work.entity";
import { WorkRepository } from "../domain/work.repository";
import { CreateWorkDto } from "./dtos/create-work.dto";
import { EditWorkDto } from "./dtos/edit-work.dto";
import { ContractsService } from "src/modules/contracts/application/contracts.service";
import { GetContractsToWorkDto } from "./dtos/filter-work.dto";

@Injectable()
export class WorksService {
  constructor(
    private contractsService: ContractsService,
    private authHttpService: AuthHttpService,
    private workRepository: WorkRepository) { }
  
  public async getWorks(paginate: PaginateDto) {
    const queryBuilder = this.workRepository.createQueryBuilder('w')
      .innerJoinAndSelect('w.afp', 'a')
      .orderBy('w.orderBy', 'ASC')
    if (paginate.ids) queryBuilder.andWhereInIds(paginate?.ids);
    const result = await this.workRepository
      .paginate(queryBuilder, paginate);
    // datos
    for (const item of result.items) {
      item.person = await this.authHttpService
        .findPerson(item.personId)
        .then(data => data)
        .catch(() => ({}));
    }
    // response
    return result;
  }

  public async createWork(createWorkDto: CreateWorkDto): Promise<WorkEntity> {
    try {
      const newWork = this.workRepository.create(createWorkDto);
      return await this.workRepository.save(newWork);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async findWork(id: number) {
    const work = await this.workRepository.findOneOrFail(id);
    const person = await this.authHttpService.findPerson(work.personId);
    work.person = person;
    return work;
  }

  public async findPerson(id: number) {
    const work = await this.workRepository.findOneOrFail(id);
    return this.authHttpService.findPerson(work.personId);
  }

  public async editWork(id: number, editWorkDto: EditWorkDto) {
    try {
      const work = await this.workRepository.findOneOrFail(id);
      const parcial = Object.assign(work, editWorkDto);
      return await this.workRepository.save(parcial);
    } catch (error) {
      throw new InternalServerErrorException;
    }
  }

  public async editState(id: number, state: boolean) {
    try {
      const work = await this.workRepository.findOneOrFail(id);
      work.state = state;
      return await this.workRepository.save(work);
    } catch (error) {
      throw new InternalServerErrorException;
    }
  }

  public async getContracts(id: number, paginate: GetContractsToWorkDto) {
    const work = await this.workRepository.findOneOrFail(id);
    return await this.contractsService.getContracts({
      ...paginate,
      workId: work.id
    });
  }
}