import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ContractRepository } from "../domain/contract.repository";
import { CreateContractDto } from "./dtos/create-contract.dto";

@Injectable()
export class ContractsService {
  constructor(private contractRepository: ContractRepository) {}

  public async createContract(createContractDto: CreateContractDto) {
    try {
      const newContract = this.contractRepository.create(createContractDto);
      return await this.contractRepository.save(newContract);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}