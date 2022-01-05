import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PimRepository } from "../domain/pim.repository";
import { ICreatePimDto } from "./dtos/create-pim.dto";

@Injectable()
export class PimsService {
  constructor(private pimRepository: PimRepository) { }
  
  public async createPim(createPimDto: ICreatePimDto) {
    try {
      const newPim = this.pimRepository.create(createPimDto);
      return await this.pimRepository.save(newPim);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}