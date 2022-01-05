import {
  DatabaseProcedured,
  ParamProcedured,
  paramModeProcedured
} from '../../../../database/database.procedured';

export class UpdateAfpPrimaProcedured extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = UpdateAfpPrimaProcedured.name;

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
        INNER JOIN (SELECT des.id, his.prima_seguro, IF(his.prima_seguro = 1,
        IF(sum(rem.monto) > af.prima_limite, (af.prima_limite * af.prima / 100), (sum(rem.monto) * af.prima / 100)), 0.00) as calculo
        FROM historials as his
        INNER JOIN config_afps as af ON af.afp_id = his.afp_id AND af.cronograma_id = p_cronograma_id
        INNER JOIN remuneracions as rem ON rem.historial_id = his.id
        INNER JOIN descuentos as des ON des.type_descuento_id = af.prima_descuento_id AND des.historial_id = his.id
        INNER JOIN cronogramas as cro ON cro.id = his.cronograma_id AND cro.remanente = 0
        WHERE his.cronograma_id = p_cronograma_id and rem.base = 0
        GROUP BY his.id, af.prima, des.type_descuento_id, his.prima_seguro, af.prima_limite) as afp_prima
        SET u_des.monto = afp_prima.calculo
        WHERE u_des.id = afp_prima.id AND u_des.edit = 0;
      `
    )
  }
}