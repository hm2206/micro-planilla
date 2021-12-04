import { EntityRepository, Repository } from 'typeorm';
import { TypeRemunerationEntity } from './type-remuneration.entity';

@EntityRepository(TypeRemunerationEntity)
export class TypeRemunerationRepository extends Repository<TypeRemunerationEntity> {}