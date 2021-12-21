import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCronogramaDto, CreateCronogramaWithAdicionalDto } from '../application/dtos/create-cronogram.dto';
import { CronogramaEntity } from '../domain/cronograma.entity';
import { CronogramaRepository } from '../domain/cronograma.repository';
import { AddDescuentosProcedured } from '../domain/procedured/add-descuentos.procedured';
import { AddInfosProcedured } from '../domain/procedured/add-infos.procedured';
import { AddRemuneracionesProcedured } from '../domain/procedured/add-remuneraciones.procedured';
import { CopyCronogramaProcedured } from '../domain/procedured/copy-cronograma.procedured';
import { ProcessCronogramasService } from './process-cronogramas.service';

@Injectable()
export class CreateCronogramaService {
  constructor(private cronogramaRepository: CronogramaRepository,
    private processCronogramasService: ProcessCronogramasService) {}

  public async create(payload: CreateCronogramaWithAdicionalDto): Promise<CronogramaEntity> {
    try {
      const isAdicional = payload.adicional >= 1;
      // validar adicional
      if (isAdicional) {
        // obtener cronogramas;
        const countAdicional = await this.cronogramaRepository.createQueryBuilder()
          .where(`entity_id = ${payload.entityId}`)
          .andWhere(`planilla_id = ${payload.planillaId}`)
          .andWhere(`year = ${payload.year}`)
          .andWhere(`mes = ${payload.mes}`)
          .getCount();
        // validar creación de adicional
        if (!countAdicional) throw new InternalServerErrorException("No se puede crear adicional");
        payload.adicional = countAdicional;
        payload.remanente = new Boolean(payload.remanente).valueOf();
        const tmpCronograma = this.cronogramaRepository.create(payload)
        const cronograma = await this.cronogramaRepository.save(tmpCronograma);
        await this.processCronogramasService.processing(cronograma.id);
        return cronograma;
      } else {
        payload.remanente = false;
        const tmpCronograma = this.cronogramaRepository.create(payload)
        const cronograma = await this.cronogramaRepository.save(tmpCronograma);
        // processar datos
        await (new AddInfosProcedured).call(cronograma.id);
        await (new AddRemuneracionesProcedured).call(cronograma.id);
        await (new AddDescuentosProcedured).call(cronograma.id);
        await this.processCronogramasService.processing(cronograma.id);
        return cronograma
      }
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  public async clone(id: number, payload: CreateCronogramaDto): Promise<any> {
    try { 
      const cronogramaSource = await this.cronogramaRepository.findOneOrFail(id);
      // validar planilla
      if (cronogramaSource.planillaId != payload.planillaId) throw new InternalServerErrorException(`
        La planilla es incompatible con la planilla recurso
      `)
      // crear cronograma
      const tmpCronograma = this.cronogramaRepository.create(payload);
      const cronograma = await this.cronogramaRepository.save(tmpCronograma);
      // processar datos
      await (new CopyCronogramaProcedured).call(cronogramaSource.id, cronograma.id);
      await this.processCronogramasService.processing(cronograma.id);
      return cronograma;
    } catch (error) {
      throw new InternalServerErrorException("No se pudo clonar el cronograma");
    }
  }
}