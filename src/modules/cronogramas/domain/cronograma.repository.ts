import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import {
  paginate,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { CronogramaEntity } from './cronograma.entity';
import { CollectionGeneric, PaginateCollection } from "../../../common/utils/collection-entity";

@EntityRepository(CronogramaEntity)
export class CronogramaRepository extends Repository<CronogramaEntity> {
  public async paginate(
    queryBuilder: SelectQueryBuilder<CronogramaEntity>,
    options: IPaginationOptions): Promise<PaginateCollection<CronogramaEntity>> {
    const result = await paginate<CronogramaEntity>(queryBuilder, options);
    return new PaginateCollection(result);
  }

  // public getTypeRemunerations(id: number, filter?: FilterTypeObject): Promise<any> {
  //   const columns = [
  //     'type.id', 'type.key', 'type.alias', 
  //     'type.descripcion', 'type.ext_pptto',
  //     'type.base', 'type.bonificacion', 'type.edit',
  //     'type.orden', 'type.estado'
  //   ];
  //   return this.createQueryBuilder('cro')
  //     .innerJoin('historials', 'his', 'his.cronograma_id = cro.id')
  //     .innerJoin('remuneracions', 'rem', 'rem.historial_id = his.id')
  //     .innerJoin('type_remuneracions', 'type', 'type.id = rem.type_remuneracion_id')
  //     .where(`cro.id = ${id}`)
  //     .andWhere(filter.cargo_id ? `his.cargo_id = ${filter.cargo_id}` : '1')
  //     .andWhere(filter.type_categoria_id ? `his.type_categoria_id = ${filter.type_categoria_id}` : '1')
  //     .andWhere(filter.meta_id ? `his.meta_id = ${filter.meta_id}` : '1')
  //     .select(`${columns.join(', ')}`)
  //     .addSelect('IFNULL(SUM(rem.monto), 0) as price')
  //     .groupBy(`${columns.join(', ')}`)
  //     .getRawMany()
  // }

  // public getTypeDescuentos(id: number, filter?: FilterTypeObject): Promise<any> {
  //   const columns = [
  //     'type.id', 'type.key', 'type.descripcion', 
  //     'type.edit', 'type.orden', 'type.estado'
  //   ];
  //   return this.createQueryBuilder('cro')
  //     .innerJoin('historials', 'his', 'his.cronograma_id = cro.id')
  //     .innerJoin('descuentos', 'des', 'des.historial_id = his.id')
  //     .innerJoin('type_descuentos', 'type', 'type.id = des.type_descuento_id')
  //     .where(`cro.id = ${id}`)
  //     .andWhere(filter.cargo_id ? `his.cargo_id = ${filter.cargo_id}` : '1')
  //     .andWhere(filter.type_categoria_id ? `his.type_categoria_id = ${filter.type_categoria_id}` : '1')
  //     .andWhere(filter.meta_id ? `his.meta_id = ${filter.meta_id}` : '1')
  //     .select(`${columns.join(', ')}`)
  //     .addSelect('IFNULL(SUM(des.monto), 0) as price')
  //     .groupBy(`${columns.join(', ')}`)
  //     .getRawMany()
  // }

  // public getTypeAportaciones(id: number, filter?: FilterTypeObject): Promise<any> {
  //   const columns = [
  //     'type.id', 'type.key', 'type.descripcion', 
  //     'type.porcentaje', 'type.minimo', 'type.default',
  //     'type.ext_pptto', 'type.estado'
  //   ];
  //   return this.createQueryBuilder('cro')
  //     .innerJoin('historials', 'his', 'his.cronograma_id = cro.id')
  //     .innerJoin('aportacions', 'apo', 'apo.historial_id = his.id')
  //     .innerJoin('type_aportacions', 'type', 'type.id = apo.type_aportacion_id')
  //     .where(`cro.id = ${id}`)
  //     .andWhere(filter.cargo_id ? `his.cargo_id = ${filter.cargo_id}` : '1')
  //     .andWhere(filter.type_categoria_id ? `his.type_categoria_id = ${filter.type_categoria_id}` : '1')
  //     .andWhere(filter.meta_id ? `his.meta_id = ${filter.meta_id}` : '1')
  //     .select(`${columns.join(', ')}`)
  //     .addSelect('IFNULL(SUM(apo.monto), 0) as price')
  //     .groupBy(`${columns.join(', ')}`)
  //     .getRawMany()
  // }

  public async getCountHistorial(ids: number[]):
    Promise<CollectionGeneric<{ id: number, total: number }>> {
    const items = await this.createQueryBuilder('cro')
      .innerJoin('cro.historials', 'his')
      .whereInIds(ids)
      .select(`cro.id, IFNULL(COUNT(his.id), 0) as total`)
      .groupBy('cro.id')
      .getRawMany();
    return new CollectionGeneric(items);
  }
}