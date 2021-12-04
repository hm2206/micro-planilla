import { EntityRepository, Repository } from 'typeorm';
import { InfoEntity } from './info.entity';

@EntityRepository(InfoEntity)
export class InfoRepository extends Repository<InfoEntity> {}