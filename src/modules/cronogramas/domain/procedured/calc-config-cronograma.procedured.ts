import {
  DatabaseProcedured,
  ParamProcedured,
  paramModeProcedured
} from '../../../../database/database.procedured';

export class CalcConfigCronogramaProcedured extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = CalcConfigCronogramaProcedured.name;

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

  public query(): string {
    return (
      `
        ${this.queryAfps()}
        ${this.queryPays()}
      `
    )
  }

  private queryAfps() {
    return (
      `
        INSERT INTO p_config_afps(afpId, cronogramaId, typeDiscountId, percent, aportDiscountId, aportPercent,
        primaDiscountId, primaPercent, primaLimit)
        SELECT af.id, ${this.getParam('pCronogramaId')}, af.typeDiscountId, 
        af.percent, af.aportDiscountId, af.aportPercent,
        af.primaDiscountId, af.primaPercent, af.primaLimit
        FROM p_afps as af WHERE NOT EXISTS (
        SELECT null FROM p_config_afps as conf WHERE conf.afpId = af.id 
        AND conf.cronogramaId = ${this.getParam('pCronogramaId')});
        UPDATE p_afps as af
        INNER JOIN p_config_afps as conf ON conf.afpId = af.id 
        AND conf.cronogramaId = ${this.getParam('pCronogramaId')}
        SET conf.typeDiscountId = af.typeDiscountId,
        conf.percent = af.percent,
        conf.aportDiscountId = af.aportDiscountId,
        conf.aportPercent = af.aportPercent,
        conf.primaDiscountId = af.primaDiscountId,
        conf.primaPercent = af.primaPercent,
        conf.primaLimit = af.primaLimit;
      `
    )
  }

  private queryPays() {
    return (
      `
        INSERT INTO p_config_pays(cronogramaId, typePayId, typeCategoryId, prefix, \`index\`, body, \`format\`, mode)
        SELECT ${this.getParam('pCronogramaId')}, type.id, type.typeCategoryId, type.prefix, type.index, type.body, type.format, type.mode
        FROM p_type_pays as type
        INNER JOIN p_cronogramas as cro ON cro.planillaId = type.planillaId
        WHERE NOT EXISTS
        (SELECT null FROM p_config_pays as con WHERE con.cronogramaId = ${this.getParam('pCronogramaId')} AND con.typePayId = type.id)
        AND cro.id = ${this.getParam('pCronogramaId')} AND type.state = 1;
        UPDATE p_config_pays as con
        INNER JOIN p_cronogramas as cro ON cro.id = con.cronogramaId
        INNER JOIN p_type_pays as type ON type.id = con.typePayId
        SET con.typeCategoryId = type.typeCategoryId,
        con.prefix = type.prefix,
        con.\`index\` = type.\`index\`,
        con.body = type.body,
        con.format = type.format,
        con.mode = type.mode
        WHERE type.state = 1
        AND cro.id = ${this.getParam('pCronogramaId')}
        AND type.typeCategoryId = con.typeCategoryId;
      `
    )
  }
}