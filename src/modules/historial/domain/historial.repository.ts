import { EntityRepository, Repository } from 'typeorm';
import { HistorialEntity } from './historial.entity';

@EntityRepository(HistorialEntity)
export class HistorialRepository extends Repository<HistorialEntity> {}