import {
  DatabaseProcedured,
  ParamProcedured,
  paramModeProcedured
} from '../../../../database/database.procedured';

export class CalcAfpsProcedured extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = CalcAfpsProcedured.name;

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
        ${this.queryIsPrimaSeguro()}
        ${this.queryAporteObligatorio()}
        ${this.queryTypes()}
      `
    )
  }

  public queryIsPrimaSeguro() {
    return (
      `
        UPDATE p_discounts as u_dis
        INNER JOIN (SELECT dis.id, his.isPrimaSeguro, IF(his.isPrimaSeguro = 1,
        IF(sum(rem.amount) > af.primaLimit, (af.primaLimit * af.primaPercent / 100), 
        (sum(rem.amount) * af.primaPercent / 100)), 0.00) as calculo
        FROM p_historials as his
        INNER JOIN p_config_afps as af ON af.afpId = his.afpId 
        AND af.cronogramaId = ${this.getParam('pCronogramaId')}
        INNER JOIN p_remunerations as rem ON rem.historialId = his.id
        INNER JOIN p_discounts as dis ON dis.typeDiscountId = af.primaDiscountId 
        AND dis.historialId = his.id
        INNER JOIN p_cronogramas as cro ON cro.id = his.cronogramaId 
        AND cro.remanente = 0
        WHERE his.cronogramaId = ${this.getParam('pCronogramaId')} 
        and rem.isBase = 1
        GROUP BY his.id, af.primaPercent, dis.typeDiscountId, his.isPrimaSeguro, af.primaLimite) as afp_prima
        SET u_dis.amount = afp_prima.calculo
        WHERE u_dis.id = afp_prima.id AND u_dis.isEdit = 0;
      `
    )
  }

  public queryAporteObligatorio() {
    return (
      `
        UPDATE p_discounts as u_dis
        INNER JOIN (SELECT dis.id, (sum(rem.amount) * af.aportPercent) / 100 as calculo
        FROM p_historials as his
        INNER JOIN p_config_afps as af ON af.afpId = his.afpId 
        AND af.cronogramaId = ${this.getParam('pCronogramaId')}
        INNER JOIN p_remunerations as rem ON rem.historialId = his.id
        INNER JOIN p_discounts as dis ON dis.typeDiscountId = af.aportDiscountId 
        AND dis.historialId = his.id
        INNER JOIN p_cronogramas as cro ON cro.id = his.cronogramaId 
        AND cro.remanente = 0
        WHERE his.cronogramaId = ${this.getParam('pCronogramaId')} 
        AND rem.isBase = 1
        GROUP BY his.id, af.aportPercent, dis.typeDiscountId) as afp_aporte
        SET u_dis.amount = afp_aporte.calculo
        WHERE u_dis.id = afp_aporte.id 
        AND u_dis.isEdit = 0;
      `
    )
  }

  public queryTypes() {
    return (
      `
        UPDATE p_discounts as u_dis
        INNER JOIN (SELECT dis.id, (sum(rem.amount) * af.percent) / 100 as calculo
        FROM p_historials as his
        INNER JOIN p_config_afps as af ON af.afpId = his.afpId 
        AND af.cronogramaId = ${this.getParam('pCronogramaId')}
        INNER JOIN p_remunerations as rem ON rem.historialId = his.id
        INNER JOIN p_discounts as dis ON dis.typeDiscountId = af.typeDiscountId 
        AND des.historialId = his.id
        WHERE his.cronogramaId = ${this.getParam('pCronogramaId')} 
        AND rem.isBase = 1
        GROUP BY des.id, af.percent) as type_afp
        SET u_dis.amount = type_afp.calculo
        WHERE u_dis.id = type_afp.id 
        AND u_dis.isEdit = 0;
      `
    )
  }
}