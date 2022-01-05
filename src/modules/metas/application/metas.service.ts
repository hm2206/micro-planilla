import { Injectable } from "@nestjs/common";
import { MetaRepository } from "../domain/meta.repository";

@Injectable()
export class MetasService {
  constructor(private metaRepository: MetaRepository) { }
  
  public findCargo() {
    return 'ok';
  }
}