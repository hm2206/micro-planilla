import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { WorkEntity } from "../domain/work.entity";
import { WorkRepository } from "../domain/work.repository";
import { CreateWorkDto } from "./dtos/create-work.dto";

@Injectable()
export class WorksService {
  constructor(private workRepository: WorkRepository) { }
  
  public async getWorks() {
    const queryBuilder = this.workRepository.createQueryBuilder('w')
      .innerJoinAndSelect('w.bank', 'b')
    return await this.workRepository.paginate(queryBuilder, { page: 1, limit: 20 });
  }

  public async createWork(createWorkDto: CreateWorkDto): Promise<WorkEntity> {
    try {
      const newWork = this.workRepository.create(createWorkDto);
      return await this.workRepository.save(newWork);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}