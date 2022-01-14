import { Injectable } from "@nestjs/common";
import { PaginateDto } from "src/common/dto/paginate.dto";
import { MetaRepository } from "../domain/meta.repository";

@Injectable()
export class MetasService {
  constructor(private metaRepository: MetaRepository) { }
  
  public async getMetas(paginate: PaginateDto) {
    const queryBuilder = this.metaRepository.createQueryBuilder('m')
    return await this.metaRepository.paginate(queryBuilder, paginate);
  }

  public findMeta(id: number) {
    return this.metaRepository.findOneOrFail(id);
  }
}