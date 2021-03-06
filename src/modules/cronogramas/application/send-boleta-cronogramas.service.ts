import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SendBoletaService } from '../../historial/application/send-boleta.service';
import { CronogramaRepository } from '../domain/cronograma.repository';

@Injectable()
export class SendBoletaCronogramas {
  constructor(
    private sendBoletaService: SendBoletaService,
    private cronogramaRepository: CronogramaRepository) {}

  public async sendMail(id: number) {
    const cronograma = await this.cronogramaRepository.findOneOrFail(id);
    // validar estado del cronograma
    if (cronograma.state) throw new InternalServerErrorException("El cronograma debe estár cerrado");
    // obtener trabajadores habilitados para enviar
    const historialIds = await this.cronogramaRepository.createQueryBuilder('cro')
      .innerJoin('historials', 'his', 'his.cronograma_id = cro.id')
      .where('his.is_email = 1')
      .where('his.send_email = 0')
      .andWhere(`cro.id = ${cronograma.id}`)
      .andWhere(`his.token_verify is not null`)
      .select('his.id as id')
      .getRawMany();
    // validar historial
    if (!historialIds.length) throw new InternalServerErrorException("No se encontró trabajadores disponibles");
    // iterar historial
    historialIds.forEach(history => {
      this.sendBoletaService.sendMail(history.id)
      .catch((err) => console.log(`error: ${history.id}, ${err.message}`));
    });
    // response
    return { 
      process: true,
      count: historialIds.length
    }
  }
}