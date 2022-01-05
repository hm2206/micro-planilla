import {
  DatabaseProcedured,
  ParamProcedured,
  paramModeProcedured
} from '../../../../database/database.procedured';

export class AddAportacionesProcedured extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = AddAportacionesProcedured.name;

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
      INSERT INTO aportacions(historial_id, type_aportacion_id, porcentaje, minimo, \`default\`, monto)
      SELECT his.id as historial_id, type.id as type_aportacion_id,
      type.porcentaje, type.minimo, type.\`default\`,
      IF(his.is_pay = 0, 0, IF (sum(rem.monto) < type.minimo, type.\`default\`, (sum(rem.monto) * type.porcentaje) / 100)) as monto
      FROM info_type_aportacion as inf
      INNER JOIN type_aportacions as type ON type.id = inf.type_aportacion_id
      INNER JOIN historials as his ON his.info_id = inf.info_id
      INNER JOIN remuneracions as rem ON rem.historial_id = his.id AND rem.base = 0
      INNER JOIN cronogramas as cro ON cro.id = his.cronograma_id AND cro.remanente = 0
      WHERE his.cronograma_id = p_cronograma_id
      AND NOT EXISTS (SELECT null FROM aportacions as apo WHERE apo.historial_id = his.id)
      GROUP BY his.id, type.id, type.porcentaje, type.minimo, type.\`default\`, his.is_pay;
      UPDATE aportacions as apo
      INNER JOIN (SELECT his.id, conf.type_aportacion_id, ((conf.uit * conf.porcentaje) / 100) as monto
      FROM config_aportes as conf
      INNER JOIN historials as his ON his.cargo_id = conf.cargo_id AND his.is_pay = 1
      INNER JOIN cronogramas as cro ON cro.id = his.cronograma_id
      INNER JOIN remuneracions as rem ON rem.historial_id = his.id AND rem.bonificacion = 0
      WHERE his.cronograma_id = p_cronograma_id and conf.\`year\` = cro.\`year\`
      GROUP BY his.id, conf.type_aportacion_id, conf.uit, conf.porcentaje
      HAVING ((conf.uit * conf.porcentaje) / 100) < sum(rem.monto)) AS con
      SET apo.monto = (con.monto * apo.porcentaje) / 100
      WHERE apo.historial_id = con.id
      AND apo.type_aportacion_id = con.type_aportacion_id;
      `
    )
  }
}