import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { TypeCargoRepository } from "../domain/type-cargo.repository";
import { CreateTypeCargoDto } from './dtos/create-type-cargo.dto';
import { UpdateTypeCargoDto } from "./dtos/update-type-cargo.dto";

@Injectable()
export class TypeCargosService {
  constructor(private typeCargoRepository: TypeCargoRepository) {}

  public getTypeCargos(){
    return this.typeCargoRepository.find();
  }

  public async createTypeCargo(createTypeCargoDto: CreateTypeCargoDto ){
    try {
      const newTypeCargo = this.typeCargoRepository.create(createTypeCargoDto);
      return await this.typeCargoRepository.save(newTypeCargo);
    } catch (error) {
      throw new InternalServerErrorException("No se pudo crear el tipo de cargo");
    }
  }

  public async findTypeCargo(id: number){
    return await this.typeCargoRepository.findOneOrFail(id);
  }

  public async updateTypeCargo(id: number, updateTypeCargoDto: UpdateTypeCargoDto ){
    try {
      return await this.typeCargoRepository.update(id, updateTypeCargoDto);
    } catch (error) {
      throw new InternalServerErrorException("No se pudo actualizar el tipo de cargo");
    }
  }

  public async deleteTypeCargo(id: number ){
    try {
      const { affected } = await this.typeCargoRepository.delete(id);
      return { process: affected > 0 }
    } catch (error) {
      throw new InternalServerErrorException("No se pudo eliminar el tipo de cargo");
    }
  }
}