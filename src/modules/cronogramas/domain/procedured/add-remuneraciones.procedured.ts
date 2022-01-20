import {
  DatabaseProcedured,
  ParamProcedured,
  paramModeProcedured
} from '../../../../database/database.procedured';

export class AddRemuneracionesProcedured extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = AddRemuneracionesProcedured.name;

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
        INSERT INTO remuneracions(historial_id, type_remuneracion_id, monto, base, bonificacion, edit, orden, is_visibled)
        SELECT his.id as historial_id, inf.type_remuneracion_id, inf.monto, inf.base, type.bonificacion, 
        IF(cro.remanente = 1, 1, type.edit), type.orden, type.is_visibled
        FROM historials as his
        INNER JOIN config_infos as inf ON inf.info_id = his.info_id
        INNER JOIN type_remuneracions as type ON inf.type_remuneracion_id = type.id
        INNER JOIN cronogramas as cro ON cro.id = his.cronograma_id
        WHERE his.cronograma_id = p_cronograma_id
        AND NOT EXISTS (SELECT null FROM remuneracions as rem 
        WHERE rem.type_remuneracion_id = inf.type_remuneracion_id and rem.historial_id = his.id);
      `
    )
  }
}
