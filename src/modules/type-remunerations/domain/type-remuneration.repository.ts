import { EntityRepository, Repository } from 'typeorm';
import { TypeRemunerationEntity } from './type-remuneration.entity';

@EntityRepository(EntityRepository)
export class TypeRemunerationRepository extends Repository<TypeRemunerationEntity> {}