import {
  DatabaseProcedured,
  ParamProcedured,
  paramModeProcedured
} from '../../../../database/database.procedured';

export class AddHistorialIdsProcedured extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = AddHistorialIdsProcedured.name;

  public params(): ParamProcedured[] {
      return [
        { 
          name: "pCronogramaId",
          type: "BIGINT",
          mode: paramModeProcedured.IN,
          length: 20
        },
        { 
          name: "pHistorialIds",
          type: "text",
          mode: paramModeProcedured.IN
        }
      ]
  }

  public call(cronogramaId: number, pHistorialIds: any[]): Promise<any> {
    return super.call(cronogramaId, pHistorialIds.join(', '));
  }

  public query() {
    return (
      `
        SET @v_query := CONCAT('INSERT INTO p_historials(cronogramaId, infoId, pimId, afpId, affiliationOfDate, numberOfCussp, 
        isPrimaSeguro, numberOfEssalud, bankId, numberOfAccount, isCheck, plaza, isPay, days, observation)
        SELECT cro.id, inf.id as infoId, inf.pimId, w.afpId, w.affiliationOfDate, w.numberOfCussp,
        w.isPrimaSeguro, w.numberOfEssalud, inf.bankId, inf.numberOfAccount, inf.isCheck, 
        cont.plaza, inf.isPay, cro.calcOfDays, inf.observation
        FROM p_infos as inf
        INNER JOIN p_contracts as cont ON inf.contractId = cont.id
        INNER JOIN p_works as w ON w.id = cont.workId
        INNER JOIN p_cronogramas as cro ON cro.id = ', ${this.getParam('pCronogramaId')}, '
        WHERE inf.state = 1
        AND inf.planillaId = cro.planillaId
        AND inf.id IN (', ${this.getParam('pHistorialIds')}, ')
        AND NOT EXISTS(SELECT null FROM p_historials as h 
        WHERE h.infoId = inf.id 
        AND h.cronogramaId = cro.id);');
        PREPARE myQuery FROM @v_query;
        EXECUTE myQuery;
        DEALLOCATE PREPARE myQuery;
      `
    )
  }
}