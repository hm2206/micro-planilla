import {
  DatabaseProcedured,
  ParamProcedured,
  paramModeProcedured
} from '../../../../database/database.procedured';

export class CalcObligationsProcedured extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = CalcObligationsProcedured.name;

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
        ${this.queryCalcWithoutLawAndWithBonification()}
        ${this.queryCalcWithoutLawAndWithoutBonification()}
        ${this.queryCalcIsNotPay()}
        ${this.querySyncConfig()}
      `
    )
  }

  public queryVerifyIsOver() {
    return (
      `
        UPDATE p_type_obligations as t
        set t.isOver = IF(t.terminationDate, 1, 0);
        UPDATE p_type_obligations as t
        set t.state = 1
        WHERE t.isOver = 0;
      `
    )
  }

  private queryDisabled() {
    return (
      `
        UPDATE p_type_obligations as t
        SET t.state = 0
        WHERE t.state = 1
        AND t.isOver = 1
        AND t.terminationDate <= DATE(NOW());
      `
    )
  }

  private queryAdd() {
    return (
      `
        INSERT INTO p_obligations(typeObligationId, discountId, documentTypeId,
        documentNumber, bankId, numberOfAccount, isCheck, isPercent,
        percent, amount, observation, \`mode\`, isBonification)
        SELECT t.id, d.id, t.documentTypeId, t.documentNumber,
        t.bankId, t.numberOfAccount, t.isCheck, t.isPercent,
        t.percent, t.amount, t.observation, t.\`mode\`, t.isBonification
        FROM p_type_obligations as t 
        INNER JOIN p_historials as h ON h.infoId = t.infoId
        INNER JOIN p_discounts as d ON d.historialId = h.id 
        AND d.typeDiscountId = t.typeDiscountId
        WHERE h.cronogramaId = ${this.getParam('pCronogramaId')}
        AND t.state = 1
        AND NOT EXISTS(
          SELECT null FROM p_obligations as obl
          WHERE obl.typeObligationId = t.id 
          AND d.historialId = h.id
          AND d.id = obl.discountId
        );
      `
    )
  }

  private queryCalcWithoutLawAndWithBonification() {
    return (
      `
        UPDATE p_obligations as obl 
        INNER JOIN p_discounts as d ON d.id = obl.discountId
        INNER JOIN (
        SELECT his.id, sum(rem.amount) as base
        FROM p_historials as his
        INNER JOIN p_remunerations as rem ON rem.historialId = his.id
        WHERE his.cronogramaId = ${this.getParam('pCronogramaId')} 
        GROUP BY his.id)
        AS up_his ON d.historialId = up_his.id
        SET obl.amount = IF(obl.mode = 'NETO', 
        ((up_his.base - (SELECT sum(dis.amount) FROM p_discounts as dis
        INNER JOIN p_type_discounts as td ON td.id = dis.typeDiscountId
        WHERE dis.historialId = up_his.id 
        AND td.except = 1)) * obl.percent) / 100, 
        (obl.percent * up_his.base) / 100)
        WHERE obl.isPercent = 1 
        AND obl.isBonification = 1;
      `
    )
  }

  private queryCalcWithoutLawAndWithoutBonification() {
    return (
      `
        UPDATE p_obligations as obl 
        INNER JOIN p_discounts as d ON d.id = obl.discountId
        INNER JOIN (
        SELECT his.id, sum(rem.amount) as base
        FROM p_historials as his
        INNER JOIN p_remunerations as rem ON rem.historialId = his.id
        WHERE his.cronogramaId = ${this.getParam('pCronogramaId')}
        AND rem.isBonification = 0 GROUP BY his.id)
        AS up_his ON d.historialId = up_his.id
        SET obl.amount = IF(obl.mode = 'NETO', 
        ((up_his.base - (SELECT sum(dis.amount) FROM p_discounts as dis
        INNER JOIN p_type_discounts as td ON td.id = dis.typeDiscountId
        WHERE dis.historialId = up_his.id 
        AND td.except = 1)) * obl.percent) / 100, 
        (obl.percent * up_his.base) / 100)
        WHERE obl.isPercent = 1 
        AND obl.isBonification = 0;
      `
    )
  }

  private queryCalcIsNotPay() {
    return (
      `
        UPDATE p_obligations as obl
        INNER JOIN p_discounts as dis ON dis.id = obl.discountId
        INNER JOIN p_historials as his ON his.id = dis.historialId
        SET obl.amount = 0
        WHERE his.cronogramaId = ${this.getParam('pCronogramaId')}
        AND his.isPay = 0;
      `
    )
  }

  private querySyncConfig() {
    return (
      `
        UPDATE p_type_obligations as type
        INNER JOIN p_obligations as obl ON obl.typeObligationId = type.id
        INNER JOIN p_discounts as dis ON dis.id = obl.discountId
        INNER JOIN p_historials as his ON his.id = dis.historialId 
        INNER JOIN p_cronogramas as cro ON cro.id = his.cronogramaId
        AND cro.remanente = 0
        SET type.documentTypeId = obl.documentTypeId,
        type.documentNumber = obl.documentNumber,
        type.bankId = obl.bankId,
        type.isCheck = obl.isCheck,
        type.numberOfAccount = obl.numberOfAccount,
        type.isPercent = obl.isPercent,
        type.percent = obl.percent,
        type.amount = obl.amount,
        type.mode = obl.mode,
        type.isBonification = obl.isBonification,
        type.observation = obl.observation
        WHERE his.cronogramaId = ${this.getParam('pCronogramaId')};
      `
    )
  }
}