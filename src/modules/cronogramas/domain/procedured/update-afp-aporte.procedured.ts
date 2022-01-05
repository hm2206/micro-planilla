import {
  DatabaseProcedured,
  ParamProcedured,
  paramModeProcedured
} from '../../../../database/database.procedured';

export class UpdateAfpAporteProcedured extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = UpdateAfpAporteProcedured.name;

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
        UPDATE descuentos as u_des
        INNER JOIN (SELECT des.id, (sum(rem.monto) * af.aporte) / 100 as calculo
        FROM historials as his
        INNER JOIN config_afps as af ON af.afp_id = his.afp_id AND af.cronograma_id = p_cronograma_id
        INNER JOIN remuneracions as rem ON rem.historial_id = his.id
        INNER JOIN descuentos as des ON des.type_descuento_id = af.aporte_descuento_id AND des.historial_id = his.id
        INNER JOIN cronogramas as cro ON cro.id = his.cronograma_id AND cro.remanente = 0
        WHERE his.cronograma_id = p_cronograma_id AND rem.base = 0
        GROUP BY his.id, af.aporte, des.type_descuento_id) as afp_aporte
        SET u_des.monto = afp_aporte.calculo
        WHERE u_des.id = afp_aporte.id AND u_des.edit = 0;
      `
    )
  }
}