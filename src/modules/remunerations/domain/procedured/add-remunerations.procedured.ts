import {
  DatabaseProcedured,
  ParamProcedured,
  paramModeProcedured
} from '../../../../database/database.procedured';

export class AddRemunerationsProcedured extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = AddRemunerationsProcedured.name;

  public params(): ParamProcedured[] {
      return [
        { 
          name: "pCronogramaId",
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
        INSERT INTO p_remunerations(historialId, typeRemunerationId, amount, isBase, isEdit)
        SELECT his.id, inf.typeRemunerationId, inf.amount, inf.isBase, 
        IF(cro.remanente = 1, 1, type.isEdit)
        FROM p_historials as his
        INNER JOIN p_info_type_remunerations as inf ON inf.infoId = his.infoId
        INNER JOIN p_type_remunerations as type ON inf.typeRemunerationId = type.id
        INNER JOIN p_cronogramas as cro ON cro.id = his.cronogramaId
        WHERE his.cronogramaId = ${this.getParam('pCronogramaId')}
        AND NOT EXISTS (SELECT null FROM p_remunerations as rem 
        WHERE rem.typeRemunerationId = inf.typeRemunerationId 
        and rem.historialId = his.id);
      `
    )
  }
}