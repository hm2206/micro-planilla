import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PimLogsService } from "../../../modules/pim-logs/application/pim-logs.service";
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
    private pimLogsService: PimLogsService,
    private cargosService: CargosService) { }

  public async getPims(paginate: GetPimDto) {
    const queryBuilder = this.pimRepository.createQueryBuilder('p')
      .innerJoinAndSelect('p.cargo', 'c')
      .innerJoinAndSelect('p.meta', 'm')
      .orderBy('p.year', 'DESC')
      .addOrderBy('p.code', 'ASC')
      .addOrderBy('c.extension', 'ASC')
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
      const pim = await this.pimRepository.findOneOrFail(id);
      // validar modificación del monto
      if (pim.amount != editPimDto.amount) {
        // validar monto executado
        const executedAmount = parseFloat(`${pim.executedAmount}`);
        if (executedAmount > 0) throw new InternalServerErrorException(
          `No se puede modificar el monto, el pim está en ejecución`
        )
        // validar logs
        const isLogs = await this.pimLogsService.isPimLogExecute(pim.id);
        if (isLogs) throw new InternalServerErrorException(`
          No se puede modificar el monto
        `);
      }
      // update
      const partial = Object.assign(pim, editPimDto);
      return await this.pimRepository.save(partial);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async editPimAmount(id: number, amount: number) {
    try {
      const pim = await this.pimRepository.findOneOrFail(id);
      const partial = Object.assign(pim, { amount });
      return await this.pimRepository.save(partial);
    } catch (error) {
      throw new InternalServerErrorException;
    }
  }

  public async findMeta(id: number) {
    return await this.metasService.findMeta(id);
  }

  public async findCargo(id: number) {
    return await this.cargosService.findCargo(id);
  }
}