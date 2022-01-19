import {
  DatabaseProcedured,
  ParamProcedured,
  paramModeProcedured
} from '../../../../database/database.procedured';

export class CalcPimYearProcedured extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = CalcPimYearProcedured.name;

  public params(): ParamProcedured[] {
      return [
        { 
          name: "pYear",
          type: "BIGINT",
          mode: paramModeProcedured.IN,
          length: 4
        }
      ]
  }

  public call(year: number): Promise<any> {
    return super.call(year);
  }

  public query() {
    return (
      `
        UPDATE p_pims as p 
        INNER JOIN (
        SELECT pim.id, ROUND(IFNULL(SUM(rem.amount), 0), 2) as calc
        FROM p_historials as his 
        INNER JOIN p_pims as pim ON pim.id = his.pimId
        INNER JOIN p_remunerations as rem ON rem.historialId = his.id
        WHERE pim.\`year\` = ${this.getParam('pYear')}
        GROUP BY pim.id
        ) as up ON up.id = p.id
        SET p.executedAmount = up.calc;
      `
    )
  }
}