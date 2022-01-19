import {
  DatabaseProcedured,
  ParamProcedured,
  paramModeProcedured
} from '../../../../database/database.procedured';

export class AddAportationsProcedured extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = AddAportationsProcedured.name;

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
        ${this.queryAdd()}
        ${this.queryCalcBase()}
        ${this.queryCalcMax()}
      `
    )
  }

  private queryAdd() {
    return (
      `
        INSERT INTO p_aportations(historialId, typeAportationId, percent, min, \`default\`, amount)
        SELECT his.id, type.id, type.percent, type.min, type.\`default\`, 0 as amount
        FROM p_info_type_aportations as inf
        INNER JOIN p_type_aportations as type ON type.id = inf.typeAportationId
        INNER JOIN p_historials as his ON his.infoId = inf.infoId
        INNER JOIN p_cronogramas as cro ON cro.id = his.cronogramaId 
        AND cro.remanente = 0
        WHERE his.cronogramaId = ${this.getParam('pCronogramaId')}
        AND NOT EXISTS (
          SELECT null FROM p_aportations as apo 
          WHERE apo.historialId = his.id
          AND apo.typeAportationId = type.id
        );
      `
    )
  }

  private queryCalcBase() {
    return (
      `
        UPDATE p_aportations as a
        INNER JOIN (SELECT apo.id, his.isPay,
        (SELECT sum(rem.amount) FROM p_remunerations as rem 
        WHERE rem.historialId = his.id AND rem.isBase = 1) as base
        FROM p_aportations as apo
        INNER JOIN p_historials as his ON his.id = apo.historialId
        WHERE his.cronogramaId = ${this.getParam('pCronogramaId')}) as copy 
        ON copy.id = a.id
        SET a.amount = IF(copy.isPay = 0, 0, 
        IF(copy.base < a.min, a.\`default\`, (copy.base * a.percent) / 100));
      `
    )
  }

  private queryCalcMax() {
    return (
      `
        UPDATE p_aportations as a
        INNER JOIN (SELECT apo.id, (con.uit * con.percent) / 100 as amountLimit,
        (SELECT sum(rem.amount) FROM p_remunerations as rem 
        WHERE rem.historialId = his.id and rem.isBase = 1) as base
        FROM p_config_aportation_max as con 
        INNER JOIN p_contracts as cont ON cont.typeCategoryId = con.typeCategoryId
        INNER JOIN p_infos as inf ON inf.contractId = cont.id
        INNER JOIN p_historials as his ON his.infoId = inf.id
        AND his.isPay = 1
        INNER JOIN p_cronogramas as cro ON cro.id = his.cronogramaId 
        and con.\`year\` = cro.\`year\`
        INNER JOIN p_aportations as apo ON apo.historialId = his.id 
        AND apo.typeAportationId = con.typeAportationId
        WHERE his.cronogramaId = ${this.getParam('pCronogramaId')}
        HAVING base > amountLimit) as calc on calc.id = a.id
        SET a.amount = (calc.amountLimit * a.percent) / 100;
      `
    )
  }
}