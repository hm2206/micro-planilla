import { Repository, EntityRepository } from 'typeorm';
import { CronogramaEntity } from './cronograma.entity';

@EntityRepository(CronogramaEntity)
export class CronogramaRepository extends Repository<CronogramaEntity> {}