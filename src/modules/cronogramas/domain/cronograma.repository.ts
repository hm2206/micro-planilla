import { Repository, EntityRepository } from 'typeorm';
import { CronogramaEntity } from './cronograma.entity';
import { FilterTypeObject } from './cronograma.dto.ts';

@EntityRepository(CronogramaEntity)
export class CronogramaRepository extends Repository<CronogramaEntity> {

  public getTypeRemunerations(id: number, filter?: FilterTypeObject): Promise<any> {
    const columns = [
      'type.id', 'type.key', 'type.alias', 
      'type.descripcion', 'type.ext_pptto',
      'type.base', 'type.bonificacion', 'type.edit',
      'type.orden', 'type.estado'
    ];
    return this.createQueryBuilder('cro')
      .innerJoin('historials', 'his', 'his.cronograma_id = cro.id')
      .innerJoin('remuneracions', 'rem', 'rem.historial_id = his.id')
      .innerJoin('type_remuneracions', 'type', 'type.id = rem.type_remuneracion_id')
      .where(`cro.id = ${id}`)
      .andWhere(filter.cargo_id ? `his.cargo_id = ${filter.cargo_id}` : '1')
      .andWhere(filter.type_categoria_id ? `his.type_categoria_id = ${filter.type_categoria_id}` : '1')
      .andWhere(filter.meta_id ? `his.meta_id = ${filter.meta_id}` : '1')
      .select(`${columns.join(', ')}`)
      .addSelect('IFNULL(SUM(rem.monto), 0) as price')
      .groupBy(`${columns.join(', ')}`)
      .getRawMany()
  }

  public getTypeDescuentos(id: number, filter?: FilterTypeObject): Promise<any> {
    const columns = [
      'type.id', 'type.key', 'type.descripcion', 
      'type.edit', 'type.orden', 'type.estado'
    ];
    return this.createQueryBuilder('cro')
      .innerJoin('historials', 'his', 'his.cronograma_id = cro.id')
      .innerJoin('descuentos', 'des', 'des.historial_id = his.id')
      .innerJoin('type_descuentos', 'type', 'type.id = des.type_descuento_id')
      .where(`cro.id = ${id}`)
      .andWhere(filter.cargo_id ? `his.cargo_id = ${filter.cargo_id}` : '1')
      .andWhere(filter.type_categoria_id ? `his.type_categoria_id = ${filter.type_categoria_id}` : '1')
      .andWhere(filter.meta_id ? `his.meta_id = ${filter.meta_id}` : '1')
      .select(`${columns.join(', ')}`)
      .addSelect('IFNULL(SUM(des.monto), 0) as price')
      .groupBy(`${columns.join(', ')}`)
      .getRawMany()
  }

  public getTypeAportaciones(id: number, filter?: FilterTypeObject): Promise<any> {
    const columns = [
      'type.id', 'type.key', 'type.descripcion', 
      'type.porcentaje', 'type.minimo', 'type.default',
      'type.ext_pptto', 'type.estado'
    ];
    return this.createQueryBuilder('cro')
      .innerJoin('historials', 'his', 'his.cronograma_id = cro.id')
      .innerJoin('aportacions', 'apo', 'apo.historial_id = his.id')
      .innerJoin('type_aportacions', 'type', 'type.id = apo.type_aportacion_id')
      .where(`cro.id = ${id}`)
      .andWhere(filter.cargo_id ? `his.cargo_id = ${filter.cargo_id}` : '1')
      .andWhere(filter.type_categoria_id ? `his.type_categoria_id = ${filter.type_categoria_id}` : '1')
      .andWhere(filter.meta_id ? `his.meta_id = ${filter.meta_id}` : '1')
      .select(`${columns.join(', ')}`)
      .addSelect('IFNULL(SUM(apo.monto), 0) as price')
      .groupBy(`${columns.join(', ')}`)
      .getRawMany()
  }

  public async getCountHistorial(id: number, filter?: FilterTypeObject): Promise<number> {
    const { total } = await this.createQueryBuilder('cro')
    .innerJoin('historials', 'his', 'his.cronograma_id = cro.id')
    .where(`cro.id = ${id}`)
    .andWhere(filter.cargo_id ? `his.cargo_id = ${filter.cargo_id}` : '1')
    .andWhere(filter.type_categoria_id ? `his.type_categoria_id = ${filter.type_categoria_id}` : '1')
    .andWhere(filter.meta_id ? `his.meta_id = ${filter.meta_id}` : '1')
    .select(`COUNT(his.id) as total`)
    .getRawOne()
    return parseInt(total);
  }

}