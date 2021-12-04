import { Injectable } from '@nestjs/common';
import { HistorialRepository } from '../domain/historial.repository';
import { HistorialEntity } from '../domain/historial.entity';

@Injectable()
export class HistorialService {
  constructor(private historialRepository: HistorialRepository) {}

  public async update(id, payload: HistorialEntity) {
    const history = await this.historialRepository.findOneOrFail(id);
    await this.historialRepository.update(history.id, payload);
    return { process: true };
  }
}