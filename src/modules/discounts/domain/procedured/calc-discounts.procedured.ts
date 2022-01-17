import {
  DatabaseProcedured,
  ParamProcedured,
  paramModeProcedured
} from '../../../../database/database.procedured';

export class CalcDiscountsProcedured extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = CalcDiscountsProcedured.name;

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
        ${this.queryVerifyIsEditObligation()}
        ${this.queryVerifyIsEditAffiliation()}
        ${this.queryCalc()}
        ${this.queryCalcIsNotPay()}
      `
    )
  }

  private queryVerifyIsEditObligation() {
    return (
      `
        UPDATE p_discounts as dis
        INNER JOIN p_historials as his ON his.id = dis.historialId
        INNER JOIN p_obligations as obl ON obl.discountId = dis.id
        SET dis.isEdit = 0
        WHERE dis.isEdit = 1
        AND his.cronogramaId = ${this.getParam('pCronogramaId')};
      `
    )
  }

  private queryVerifyIsEditAffiliation() {
    return (
      `
        UPDATE p_discounts as dis
        INNER JOIN p_historials as his ON his.id = dis.historialId
        INNER JOIN p_affiliations as af ON af.discountId = dis.id
        SET dis.isEdit = 0
        WHERE dis.isEdit = 1
        AND his.cronogramaId = ${this.getParam('pCronogramaId')};
      `
    )
  }

  private queryCalc() {
    return (
      `
        SELECT dis.id,
        IFNULL((
          SELECT SUM(af.amount) FROM p_affiliations as af
          WHERE af.discountId = dis.id
        ), 0) as calcAffiliation,
        IFNULL((
          SELECT SUM(obl.amount) FROM p_obligations as obl
          WHERE obl.discountId = dis.id
        ),0) as calcObligation
        FROM p_discounts as dis 
        INNER JOIN p_historials as his ON his.id = dis.historialId
        WHERE his.cronogramaId = ${this.getParam('pCronogramaId')}
        AND dis.isEdit = 0;
      `
    )
  }

  private queryCalcIsNotPay() {
    return (
      `
        UPDATE p_discounts as dis
        INNER JOIN p_historials as his ON his.id = dis.historialId
        SET amount = 0
        WHERE his.cronogramaId = ${this.getParam('pCronogramaId')}
        AND his.isPay = 0;
      `
    )
  }
}