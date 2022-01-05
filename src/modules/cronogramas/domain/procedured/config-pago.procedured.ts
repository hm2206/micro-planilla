import {
  DatabaseProcedured,
  ParamProcedured,
  paramModeProcedured
} from '../../../../database/database.procedured';

export class ConfigPagoProcedured extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = ConfigPagoProcedured.name;

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
      INSERT INTO config_pagos(cronograma_id, type_pago_id, type_categoria_id, prefix, \`index\`, body, formato, type)
      SELECT p_cronograma_id, type.id, type.type_categoria_id, type.prefix, type.index, type.body, type.formato, type.type
      FROM \`type_pagos\` as type
      INNER JOIN cronogramas as cro ON cro.planilla_id = type.planilla_id
      WHERE NOT EXISTS
      (SELECT null FROM config_pagos as con WHERE con.cronograma_id = p_cronograma_id AND con.type_pago_id = type.id)
      AND cro.id = p_cronograma_id AND type.estado = 1;
      UPDATE config_pagos as con
      INNER JOIN cronogramas as cro ON cro.id = con.cronograma_id
      INNER JOIN type_pagos as type ON type.id = con.type_pago_id
      SET con.type_categoria_id = type.type_categoria_id,
      con.prefix = type.prefix,
      con.\`index\` = type.\`index\`,
      con.body = type.body,
      con.formato = type.formato,
      con.type = type.type
      WHERE type.estado = 1 AND cro.id = p_cronograma_id
      AND type.type_categoria_id = con.type_categoria_id;
      `
    )
  }
}