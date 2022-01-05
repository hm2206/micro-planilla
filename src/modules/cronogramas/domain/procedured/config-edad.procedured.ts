import {
  DatabaseProcedured,
  ParamProcedured,
  paramModeProcedured
} from '../../../../database/database.procedured';

export class ConfigEdadProcedured extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = ConfigEdadProcedured.name;

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
      INSERT INTO config_edads(cargo_id, cronograma_id, limite_edad)
      SELECT car.id, p_cronograma_id, car.limite_edad FROM \`cargos\` as car 
      INNER JOIN historials as his ON his.cargo_id = car.id
      WHERE his.cronograma_id = p_cronograma_id AND car.limite_edad > 0
      AND NOT EXISTS(SELECT null FROM config_edads as ed WHERE ed.cronograma_id = p_cronograma_id AND ed.cargo_id = his.cargo_id)
      GROUP BY car.id, car.limite_edad;
      UPDATE config_edads as ed
      INNER JOIN (SELECT car.id, p_cronograma_id, car.limite_edad FROM \`cargos\` as car
      INNER JOIN historials as his ON his.cargo_id = car.id
      WHERE his.cronograma_id = p_cronograma_id AND car.limite_edad > 0
      GROUP BY car.id, car.limite_edad) as conf ON conf.id = ed.cargo_id
      SET ed.limite_edad = conf.limite_edad;
      `
    )
  }
}