import { DatabaseProcedured, ParamProcedured, paramModeProcedured } from 'src/database/database.procedured';

export class UpdateAportacionProcedured extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = UpdateAportacionProcedured.name;

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
        UPDATE aportacions as a
        INNER JOIN (SELECT apo.id, his.is_pay,
        (SELECT sum(rem.monto) FROM remuneracions as rem WHERE rem.historial_id = his.id AND rem.base = 0) as base
        FROM aportacions as apo
        INNER JOIN historials as his ON his.id = apo.historial_id
        WHERE his.cronograma_id = p_cronograma_id) as copy ON copy.id = a.id
        SET a.monto = IF(copy.is_pay = 0, 0, IF(copy.base < a.minimo, a.\`default\`, (copy.base * a.porcentaje) / 100));
        UPDATE aportacions as a
        INNER JOIN (SELECT apo.id, (con.uit * con.porcentaje) / 100 as limite,
        (SELECT sum(rem.monto) FROM remuneracions as rem WHERE rem.historial_id = his.id and rem.base = 0) as base
        FROM config_aportes as con INNER JOIN historials as his ON his.cargo_id = con.cargo_id AND his.is_pay = 1
        INNER JOIN cronogramas as cro ON cro.id = his.cronograma_id and con.\`year\` = cro.\`year\`
        INNER JOIN aportacions as apo ON apo.historial_id = his.id AND apo.type_aportacion_id = con.type_aportacion_id
        WHERE his.cronograma_id = p_cronograma_id
        HAVING base > limite) as calc on calc.id = a.id
        SET a.monto = (calc.limite * a.porcentaje) / 100;
      `
    )
  }
}