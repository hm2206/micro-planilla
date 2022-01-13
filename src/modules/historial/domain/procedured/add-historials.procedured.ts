import {
  DatabaseProcedured,
  ParamProcedured,
  paramModeProcedured
} from '../../../../database/database.procedured';

export class AddHistorialsProcedured extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = AddHistorialsProcedured.name;

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
      INSERT INTO p_historials(cronogramaId, infoId, pimId, afpId, affiliationOfDate, numberOfCussp, 
      isPrimaSeguro, numberOfEssalud, bankId, numberOfAccount, isCheck, plaza, isPay, days)
      SELECT cro.id, inf.id as infoId, inf.pimId, w.afpId, w.affiliationOfDate, w.numberOfCussp,
      w.isPrimaSeguro, w.numberOfEssalud, inf.bankId, inf.numberOfAccount, inf.isCheck, 
      cont.plaza, inf.isPay, cro.calcOfDays
      FROM p_infos as inf
      INNER JOIN p_contracts as cont ON inf.contractId = cont.id
      INNER JOIN p_works as w ON w.id = cont.workId
      INNER JOIN p_cronogramas as cro ON cro.id = ${this.params()[0].name}
      WHERE inf.state = 1
      AND NOT EXISTS(SELECT null FROM p_historials as h WHERE h.infoId = inf.id 
      AND h.cronogramaId = cro.id);
      `
    )
  }
}