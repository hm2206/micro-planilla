import { Injectable } from "@nestjs/common";
import { PaginateDto } from "src/common/dto/paginate.dto";
import { DependencyRepository } from "../domain/dependency.repository";

@Injectable()
export class DependenciesService {
  constructor(private dependencyRepository: DependencyRepository) { }
  
  public async getDependencies(paginate: PaginateDto) {
    const queryBuilder = this.dependencyRepository.createQueryBuilder('d');
    return await this.dependencyRepository.paginate(queryBuilder, paginate);
  }
}