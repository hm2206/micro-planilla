import {
  DatabaseProcedured,
  ParamProcedured,
  paramModeProcedured
} from '../../../../database/database.procedured';

export class AddSindicatoProcedured extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = AddSindicatoProcedured.name;

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
        INSERT sindicatos(historial_id, type_sindicato_id, type_descuento_id, monto, porcentaje)
        SELECT his.id as historial_id, type.id as type_sindicato_id, type.type_descuento_id,
        type.monto, type.porcentaje
        FROM info_sindicato as inf
        INNER JOIN type_sindicatos as type ON type.id = inf.type_sindicato_id
        INNER JOIN historials as his ON his.info_id = inf.info_id
        INNER JOIN cronogramas as cro ON cro.id = his.cronograma_id AND cro.remanente = 0
        WHERE his.cronograma_id = p_cronograma_id
        AND NOT EXISTS (SELECT null FROM sindicatos AS sin WHERE sin.historial_id = his.id);
      `
    )
  }
}