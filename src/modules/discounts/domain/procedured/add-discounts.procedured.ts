import {
  DatabaseProcedured,
  ParamProcedured,
  paramModeProcedured
} from '../../../../database/database.procedured';

export class AddDiscountsProcedured extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = AddDiscountsProcedured.name;

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
        INSERT INTO p_discounts(historialId, typeDiscountId, amount, isEdit, isModify)
        SELECT his.id, type.id, IF(cro.remanente = 1, 0,  c.amount), 
        IF(cro.remanente = 1, 1, type.isEdit), 0 as isModify
        FROM p_historials as his
        INNER JOIN p_info_type_discounts as c ON c.infoId = his.infoId
        INNER JOIN p_type_discounts as type ON type.id = c.typeDiscountId
        INNER JOIN p_cronogramas as cro ON cro.id = his.cronogramaId
        WHERE his.cronogramaId = ${this.getParam('pCronogramaId')}
        AND NOT EXISTS (SELECT null FROM p_discounts as des 
        WHERE des.typeDiscountId = type.id AND des.historialId = his.id);
      `
    )
  }
}