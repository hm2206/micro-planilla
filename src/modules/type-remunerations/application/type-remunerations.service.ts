import { Injectable } from "@nestjs/common";
import { PaginateDto } from "../../../common/dto/paginate.dto";
import { TypeRemunerationRepository } from "../domain/type-remuneration.repository";

@Injectable()
export class TypeRemunerationsService {
  constructor(private typeRemunerationRepository: TypeRemunerationRepository) { }
  
  public async getTypeRemunerations(paginate: PaginateDto) {
    const queryBuilder = this.typeRemunerationRepository.createQueryBuilder('t')
      .orderBy('t.code', 'ASC');
    return await this.typeRemunerationRepository.paginate(queryBuilder, paginate);
  }
}