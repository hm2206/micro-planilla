import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CargosService } from "../../../modules/cargos/application/cargos.service";
import { MetasService } from "../../../modules/metas/application/metas.service";
import { PimEntity } from "../domain/pim.entity";
import { PimRepository } from "../domain/pim.repository";
import { ICreatePimDto } from "./dtos/create-pim.dto";
import { IEditPimDto } from "./dtos/edit-pim.dto";
import { GetPimDto } from "./dtos/filter-pim.dto";

@Injectable()
export class PimsService {
  constructor(
    private pimRepository: PimRepository,
    private metasService: MetasService,
    private cargosService: CargosService) { }

  public async getPims(paginate: GetPimDto) {
    const queryBuilder = this.pimRepository.createQueryBuilder('p')
      .innerJoinAndSelect('p.cargo', 'c')
      .innerJoinAndSelect('p.meta', 'm')
    if (paginate.year) queryBuilder.andWhere('p.year = :year', paginate);
    return await this.pimRepository.paginate(queryBuilder, paginate);
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
    return await this.pimRepository.createQueryBuilder('pim')
      .innerJoinAndSelect('pim.meta', 'met')
      .innerJoinAndSelect('pim.cargo', 'car')
      .where(`pim.id = ${id}`)
      .getOneOrFail();
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

  public async findMeta(id: number) {
    return await this.metasService.findMeta(id);
  }

  public async findCargo(id: number) {
    return await this.cargosService.findCargo(id);
  }
}