import {
  DatabaseProcedured,
  ParamProcedured,
  paramModeProcedured
} from '../../../../database/database.procedured';

export class ClearPayProcedured extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = ClearPayProcedured.name;

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
        UPDATE historials as his
        INNER JOIN remuneracions as rem ON rem.historial_id = his.id
        INNER JOIN config_infos as conf ON conf.info_id = his.info_id AND conf.type_remuneracion_id = rem.type_remuneracion_id
        SET rem.monto = (conf.monto / 30) * his.dias
        WHERE his.cronograma_id = p_cronograma_id AND rem.edit = 0;
        UPDATE info_type_descuentos as con
        INNER JOIN historials as his ON his.info_id = con.info_id
        INNER JOIN descuentos as des ON des.historial_id = his.id
        AND des.type_descuento_id = con.type_descuento_id
        AND des.edit = 1 AND des.modify = 0
        AND his.cronograma_id = p_cronograma_id
        SET des.monto = con.monto;
      `
    )
  }
}