import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PimEntity } from "../domain/pim.entity";
import { PimRepository } from "../domain/pim.repository";
import { ICreatePimDto } from "./dtos/create-pim.dto";
import { IEditPimDto } from "./dtos/edit-pim.dto";

@Injectable()
export class PimsService {
  constructor(private pimRepository: PimRepository) { }

  public async getPims() {
    return await this.pimRepository.createQueryBuilder('p')
      .innerJoinAndSelect('p.cargo', 'c')
      .innerJoinAndSelect('p.meta', 'm')
      .getMany();
  }
  
  public async createPim(createPimDto: ICreatePimDto): Promise<PimEntity> {
    try {
      const newPim = this.pimRepository.create(createPimDto);
      return await this.pimRepository.save(newPim);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async findPim(id: number): Promise<PimEntity> {
    return await this.pimRepository.findOneOrFail(id);
  }

  public async editPim(id: number, editPimDto: IEditPimDto): Promise<PimEntity> {
    try {
      const pim = await this.findPim(id);
      const partial = Object.assign(pim, editPimDto);
      return await this.pimRepository.save(partial);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  public async findCargo(id: number) {
    return 'ok';
  }
}