import { EntityRepository, Repository } from 'typeorm';
import { PlanillaEntity } from './planilla.entity';

@EntityRepository(PlanillaEntity)
export class PlanillaRepository extends Repository<PlanillaEntity> {}