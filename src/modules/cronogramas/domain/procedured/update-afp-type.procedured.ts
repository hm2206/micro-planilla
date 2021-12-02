import { DatabaseProcedured, ParamProcedured, paramModeProcedured } from 'src/database/database.procedured';

export class UpdateAfpTypeProcedured extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = UpdateAfpTypeProcedured.name;

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
        INNER JOIN (SELECT des.id, (sum(rem.monto) * af.porcentaje) / 100 as calculo
        FROM historials as his
        INNER JOIN config_afps as af ON af.afp_id = his.afp_id AND af.cronograma_id = p_cronograma_id
        INNER JOIN remuneracions as rem ON rem.historial_id = his.id
        INNER JOIN descuentos as des ON des.type_descuento_id = af.type_descuento_id AND des.historial_id = his.id
        WHERE his.cronograma_id = p_cronograma_id AND rem.base = 0
        GROUP BY des.id, af.porcentaje) as type_afp
        SET u_des.monto = type_afp.calculo
        WHERE u_des.id = type_afp.id AND u_des.edit = 0;
      `
    )
  }
}