import { Injectable } from "@nestjs/common";
import { MetaRepository } from "../domain/meta.repository";

@Injectable()
export class MetasService {
  constructor(private metaRepository: MetaRepository) { }
  
  public findMeta(id: number) {
    return this.metaRepository.findOneOrFail(id);
  }
}