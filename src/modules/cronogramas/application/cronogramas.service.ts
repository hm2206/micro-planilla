import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateCronograma } from '../domain/cronograma.dto.ts';
import { CronogramaEntity } from '../domain/cronograma.entity';
import { CronogramaRepository } from '../domain/cronograma.repository';

@Injectable()
export class CronogramasService {
  constructor(private cronogramaRepository: CronogramaRepository) {}

  public create(payload: CreateCronograma): Observable<CronogramaEntity> {
    return new Observable(subscriber => {
      const execute = async () => {
        try {
          const tmpCronograma = this.cronogramaRepository.create(payload)
          return await this.cronogramaRepository.save(tmpCronograma);
        } catch (err) {
          console.log(err);
          throw new InternalServerErrorException("No se pudó guardar los datos");
        }
      }
      // handle
      execute()
      .then(res => subscriber.next(res))
      .catch(err => subscriber.error(err));
    });
  }
}