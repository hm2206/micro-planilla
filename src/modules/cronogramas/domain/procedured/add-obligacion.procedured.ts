import {
  DatabaseProcedured,
  ParamProcedured,
  paramModeProcedured
} from '../../../../database/database.procedured';

export class AddObligacionProcedured extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = AddObligacionProcedured.name;

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
        UPDATE type_obligacions as type
        INNER JOIN historials as his ON his.info_id = type.info_id
        INNER JOIN cronogramas as cro ON his.cronograma_id = cro.id AND cro.remanente = 0
        SET type.estado = 0, type.updated_at = CURRENT_TIMESTAMP()
        WHERE his.cronograma_id = p_cronograma_id AND type.estado = 1
        AND type.fecha_de_termino is NOT null
        AND YEAR(type.fecha_de_termino) = cro.\`year\`
        AND MONTH(type.fecha_de_termino) < cro.mes;
        INSERT INTO obligacions(beneficiario, tipo_documento, numero_de_documento, numero_de_cuenta, porcentaje,
        monto, historial_id, type_descuento_id, observacion, is_porcentaje, modo, type_obligacion_id, bonificacion)
        SELECT  type.beneficiario, type.tipo_documento, type.numero_de_documento, type.numero_de_cuenta,
        type.porcentaje, IF(type.is_porcentaje, IF(type.modo = 'NETO', 
        ((sum(rem.monto) - (SELECT sum(des.monto) FROM descuentos as des WHERE des.historial_id = his.id
        AND des.except = 1)) * type.porcentaje / 100),
        (sum(rem.monto) * type.porcentaje) / 100), type.monto) as monto,
        his.id as historial_id, type.type_descuento_id, type.observacion, type.is_porcentaje, type.modo, type.id, type.bonificacion
        FROM type_obligacions as type
        INNER JOIN historials as his ON his.info_id = type.info_id
        INNER JOIN remuneracions as rem ON rem.historial_id = his.id
        INNER JOIN cronogramas as cro ON cro.id = his.cronograma_id AND cro.remanente = 0
        WHERE his.cronograma_id = p_cronograma_id AND type.estado = 1
        AND NOT EXISTS(SELECT null FROM obligacions as obl WHERE obl.historial_id = his.id AND obl.type_obligacion_id = type.id)
        GROUP BY type.beneficiario, type.tipo_documento, type.numero_de_documento,
        type.numero_de_cuenta, type.porcentaje, type.monto, his.id, type.type_descuento_id,
        type.observacion, type.is_porcentaje, type.id, type.bonificacion;
      `
    )
  }
}