import {
  DatabaseProcedured,
  ParamProcedured,
  paramModeProcedured
} from '../../../../database/database.procedured';

export class UpdateObligacionProcedured extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = UpdateObligacionProcedured.name;

  public params(): ParamProcedured[] {
      return [
        { 
          name: "p_cronograma_id",
          type: "BIGINT",
          mode: paramModeProcedured.IN,
          length: 20
        }
      ]
  }

  public call(cronogramaId: number): Promise<any> {
    return super.call(cronogramaId);
  }

  public query() {
    return (
      `
        UPDATE descuentos as des
        INNER JOIN historials as his ON his.id = des.historial_id
        SET des.monto = 0
        WHERE his.cronograma_id = p_cronograma_id AND des.edit = 0 AND des.judicial = 1;
        
        # actualizar las obligaciones por porcentaje con bonificacion
        UPDATE obligacions as obl INNER JOIN (
        SELECT his.id, sum(rem.monto) as base
        FROM historials as his
        INNER JOIN remuneracions as rem ON rem.historial_id = his.id
        WHERE his.cronograma_id = p_cronograma_id AND rem.is_visibled = 1
        GROUP BY his.id)
        AS up_his ON obl.historial_id = up_his.id
        SET obl.monto = IF(obl.modo = 'NETO', 
        ((up_his.base - (SELECT sum(des.monto) FROM descuentos as des
        WHERE des.historial_id = up_his.id AND des.except = 1)) * obl.porcentaje) / 100, 
        (obl.porcentaje * up_his.base) / 100)
        WHERE obl.is_porcentaje = 1 AND obl.bonificacion = 1;
        
        # actualizar las obligaciones por porcentaje sin bonificacion
        UPDATE obligacions as obl INNER JOIN (
        SELECT his.id, sum(rem.monto) as base
        FROM historials as his
        INNER JOIN remuneracions as rem ON rem.historial_id = his.id
        WHERE his.cronograma_id = p_cronograma_id AND rem.bonificacion = 0 AND rem.is_visibled = 1
        GROUP BY his.id)
        AS up_his ON obl.historial_id = up_his.id
        SET obl.monto = IF(obl.modo = 'NETO', 
        ((up_his.base - (SELECT sum(des.monto) FROM descuentos as des
        WHERE des.historial_id = up_his.id AND des.except = 1)) * obl.porcentaje) / 100, 
        (obl.porcentaje * up_his.base) / 100)
        WHERE obl.is_porcentaje = 1 AND obl.bonificacion = 0;
        UPDATE obligacions as o INNER JOIN (
        SELECT obl.id, IF(sum(rem.monto) > obl.monto, obl.monto, sum(rem.monto)) as monto
        FROM obligacions as obl
        INNER JOIN historials as his ON his.id = obl.historial_id
        INNER JOIN remuneracions as rem ON rem.historial_id = his.id
        WHERE his.cronograma_id = p_cronograma_id AND obl.is_porcentaje = 0
        GROUP BY obl.id, obl.is_porcentaje) AS up ON up.id = o.id
        SET o.monto = o.monto;
        UPDATE descuentos as des
        INNER JOIN historials as t2 ON t2.id = des.historial_id
        INNER JOIN (SELECT obl.historial_id, obl.type_descuento_id, sum(obl.monto) as monto
        FROM obligacions as obl
        INNER JOIN historials AS his ON his.id = obl.historial_id
        WHERE his.cronograma_id = p_cronograma_id
        GROUP BY obl.historial_id, obl.type_descuento_id) as u_obl
        ON u_obl.historial_id = t2.id AND u_obl.type_descuento_id = des.type_descuento_id
        SET des.monto = u_obl.monto
        WHERE t2.cronograma_id = p_cronograma_id;
        UPDATE \`obligacions\` as obl 
        INNER JOIN historials as his on his.id = obl.historial_id
        INNER JOIN type_obligacions as type on type.id = obl.type_obligacion_id
        SET type.numero_de_cuenta = obl.numero_de_cuenta,
        type.is_porcentaje = obl.is_porcentaje,
        type.porcentaje = obl.porcentaje,
        type.modo = obl.modo,
        type.monto = obl.monto,
        type.bonificacion = obl.bonificacion,
        type.observacion = obl.observacion
        WHERE his.cronograma_id = p_cronograma_id;
      `
    )
  }
}
