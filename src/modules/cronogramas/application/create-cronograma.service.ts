import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AddHistorialsProcedured } from 'src/modules/historial/domain/procedured/add-historials.procedured';
import { CreateCronogramaDto, CreateCronogramaWithAdicionalDto } from '../application/dtos/create-cronogram.dto';
import { CronogramaEntity } from '../domain/cronograma.entity';
import { CronogramaRepository } from '../domain/cronograma.repository';
import { AddDiscountsProcedured } from '../../discounts/domain/procedured/add-discounts.procedured';
import { AddRemunerationsProcedured } from '../../remunerations/domain/procedured/add-remunerations.procedured';
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
          .where(`campusId = :campusId`, payload)
          .andWhere(`planillaId = :planillaId`, payload)
          .andWhere(`year = :year`, payload)
          .andWhere(`month = :month`, payload)
          .getCount();
        // validar creación de adicional
        if (!countAdicional) throw new InternalServerErrorException("No se puede crear adicional");
        payload.adicional = countAdicional;
        const newCronograma = this.cronogramaRepository.create(payload)
        const cronograma = await this.cronogramaRepository.save(newCronograma);
        await this.processCronogramasService.processing(cronograma.id);
        return cronograma;
      } else {
        payload.remanente = false;
        const newCronograma = this.cronogramaRepository.create(payload)
        const cronograma = await this.cronogramaRepository.save(newCronograma);
        // processar datos
        await (new AddHistorialsProcedured).call(cronograma.id);
        await (new AddRemunerationsProcedured).call(cronograma.id);
        await (new AddDiscountsProcedured).call(cronograma.id);
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