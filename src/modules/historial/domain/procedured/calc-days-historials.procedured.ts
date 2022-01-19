import {
  DatabaseProcedured,
  ParamProcedured,
  paramModeProcedured
} from '../../../../database/database.procedured';

export class CalcDaysHistorialsProcedured extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = CalcDaysHistorialsProcedured.name;

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
      UPDATE p_historials as his
      INNER JOIN (
        SELECT h.id, 
        IFNULL(DATEDIFF(cont.terminationDate, CONCAT(cro.\`year\`, '-', cro.\`month\`, '-01')), 0) + 1 as days,
				cro.calcOfDays,
        cro.numberOfDays
        FROM p_cronogramas as cro
        INNER JOIN p_historials as h ON h.cronogramaId = cro.id
        INNER JOIN p_infos as inf ON inf.id = h.infoId
        INNER JOIN p_contracts as cont ON cont.id = inf.contractId
        WHERE inf.isSync = 1 AND cont.terminationDate is not null
        AND cro.id = ${this.params()[0].name}
      ) as up ON up.id = his.id
      SET his.days = IF(up.days >= up.numberOfDays, up.calcOfDays, IF(up.days < 0, 0, up.days));
      `
    )
  }
}