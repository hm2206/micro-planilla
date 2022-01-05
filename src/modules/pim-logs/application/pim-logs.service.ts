import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PimLogRepository } from "../domain/pim-log.repository";
import { ICreatePimLogDto } from "./dtos/create-pim-log.dto";

@Injectable()
export class PimLogsService {
  constructor(private pimLogRepository: PimLogRepository) { }
  
  public async createPimLog(createPimLogDto: ICreatePimLogDto) {
    try {
      const newPimLog = this.pimLogRepository.create(createPimLogDto);
      return await this.pimLogRepository.save(newPimLog);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}