import {
  DatabaseProcedured,
  ParamProcedured,
  paramModeProcedured
} from '../../../../database/database.procedured';

export class CalcRemunerationsProcedured extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = CalcRemunerationsProcedured.name;

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
        ${this.calcOfDays()}
        ${this.calcNotIsPay()}
      `
    )
  }

  private calcOfDays() {
    return (
      `
        UPDATE p_historials as his
        INNER JOIN p_cronogramas as cro ON cro.id = his.cronogramaId
        INNER JOIN p_remunerations as rem ON rem.historialId = his.id
        INNER JOIN p_info_type_remunerations as conf ON conf.infoId = his.infoId 
        AND conf.typeRemunerationId = rem.typeRemunerationId
        SET rem.amount = (conf.amount / cro.calcOfDays) * his.days
        WHERE cro.id = ${this.getParam('pCronogramaId')} AND rem.isEdit = 0;
      `
    )
  }

  private calcNotIsPay() {
    return (
      `
        UPDATE p_historials as his
        INNER JOIN p_remunerations as rem ON rem.historialId = his.id
        SET rem.amount = 0
        WHERE his.cronogramaId = ${this.getParam('pCronogramaId')}
        AND his.isPay = 0;
      `
    )
  }
}