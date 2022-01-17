import {
  DatabaseProcedured,
  ParamProcedured,
  paramModeProcedured
} from '../../../../database/database.procedured';

export class CalcAffiliationsProcedured extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = CalcAffiliationsProcedured.name;

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
        ${this.queryVerifyIsOver()}
        ${this.queryDisabled()}
        ${this.queryAdd()}
        ${this.queryCalc()}
        ${this.queryCalcIsNotPay()}
      `
    )
  }

  private queryVerifyIsOver() {
    return (
      `
        UPDATE p_info_type_affiliations as it
        SET isOver = IF(it.terminationDate, 1, 0)
        WHERE it.state = 1;
      `
    )
  }

  private queryDisabled() {
    return (
      `
        UPDATE p_info_type_affiliations as it
        SET it.state = 0
        AND it.state = 1
        AND it.isOver = 1
        AND it.terminationDate <= DATE(NOW()); 
      `
    )
  }

  private queryAdd() {
    return (
      `
        INSERT INTO p_affiliations(discountId, infoTypeAffiliationId,
        isPercent, percent, amount)
        SELECT dis.id, it.id, ta.isPercent, ta.percent, it.amount
        FROM p_info_type_affiliations as it
        INNER JOIN p_historials as h ON h.infoId = it.infoId
        INNER JOIN p_type_affiliations as ta ON ta.id = it.typeAffiliationId
        INNER JOIN p_discounts as dis ON dis.historialId = h.id 
        AND dis.typeDiscountId = ta.typeDiscountId
        WHERE h.cronogramaId = ${this.getParam('pCronogramaId')}
        AND it.state = 1
        AND NOT EXISTS (
          SELECT * FROM p_affiliations as a 
          WHERE a.discountId = dis.id
        );
      `
    )
  }

  private queryCalc() {
    return (
      `
        UPDATE p_affiliations as a 
        INNER JOIN (
          SELECT
          af.id,
          af.amount,
          ((
            SELECT SUM(rem.amount) FROM p_remunerations as rem
            WHERE rem.historialId = dis.historialId
            AND rem.isBonification = 0
          ) * af.percent) / 100 as calc
          FROM p_affiliations as af 
          INNER JOIN p_discounts as dis ON dis.id = af.discountId
          INNER JOIN p_historials as his ON his.id = dis.historialId
          WHERE af.isPercent = 1
          AND his.cronogramaId = ${this.getParam('pCronogramaId')}
        ) as up ON up.id = a.id
        SET a.amount = ROUND(IFNULL(up.calc, 0), 2);
      `
    )
  }

  private queryCalcIsNotPay() {
    return (
      `
        UPDATE p_affiliations as af
        INNER JOIN p_discounts as dis ON dis.id = af.discountId
        INNER JOIN p_historials as his ON his.id = dis.historialId
        SET af.amount = 0
        WHERE his.cronogramaId = ${this.getParam('pCronogramaId')}
        AND his.isPay = 0;
      `
    )
  }
}