import { Injectable } from "@nestjs/common";
import { PaginateDto } from "src/common/dto/paginate.dto";
import { TypeCategoryRepository } from "../domain/type-category.repository";

@Injectable()
export class TypeCategoriesService {
  constructor(private typeCategoryRepository: TypeCategoryRepository) { }
  
  public async getTypeCategories(paginate: PaginateDto) {
    const queryBuilder = this.typeCategoryRepository.createQueryBuilder('t')
    return await this.typeCategoryRepository.paginate(queryBuilder, paginate);
  }
}