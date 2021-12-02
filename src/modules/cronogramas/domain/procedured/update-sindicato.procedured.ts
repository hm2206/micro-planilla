import { DatabaseProcedured, ParamProcedured, paramModeProcedured } from 'src/database/database.procedured';

export class UpdateSindicatoProcedured extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = UpdateSindicatoProcedured.name;

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
        UPDATE type_sindicatos as type
        INNER JOIN descuentos as des ON des.type_descuento_id = type.type_descuento_id
        INNER JOIN historials as his ON his.id = des.historial_id
        SET des.monto = 0
        WHERE his.cronograma_id = p_cronograma_id AND des.edit = 0;
        UPDATE descuentos as des
        INNER JOIN (SELECT his.id, sin.type_descuento_id,
        IF(sin.porcentaje, (sum(rem.monto) * sin.porcentaje) / 100, sin.monto) as calculo
        FROM historials as his
        INNER JOIN sindicatos as sin ON his.id = sin.historial_id
        INNER JOIN remuneracions as rem ON his.id = rem.historial_id
        AND rem.bonificacion = 0
        WHERE his.cronograma_id = p_cronograma_id
        GROUP BY his.id, sin.type_descuento_id, sin.porcentaje, sin.monto)
        AS up_sin ON up_sin.id = des.historial_id
        AND up_sin.type_descuento_id = des.type_descuento_id AND des.edit = 0
        SET des.monto = up_sin.calculo;
      `
    )
  }
}