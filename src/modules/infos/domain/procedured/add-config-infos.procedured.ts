import {
  DatabaseProcedured,
  ParamProcedured,
  paramModeProcedured
} from '../../../../database/database.procedured';

export class AddConfigInfosProcedure extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = AddConfigInfosProcedure.name;

  public params(): ParamProcedured[] {
    return [
      {
        name: "pInfoId",
        type: "BIGINT",
        mode: paramModeProcedured.IN,
        length: 20
      }
    ]
  }

  public call(infoId: number): Promise<any> {
    return super.call(infoId);
  }

  public query() {
    return (
      `
      ${this.queryTypeRemunerations()}
      ${this.queryTypeDiscounts()}
      ${this.queryTypeAportations()}
      `
    )
  }

  private queryTypeRemunerations() {
    return (
      `
      INSERT INTO p_info_type_remunerations(infoId, typeRemunerationId, amount, isBase)
      SELECT inf.id, rem.id, conf.amount, rem.isBase FROM p_infos as inf 
      INNER JOIN p_contracts as cont ON cont.id = inf.contractId
      INNER JOIN p_config_type_remunerations as conf ON conf.planillaId = inf.planillaId AND conf.typeCategoryId = cont.typeCategoryId
      INNER JOIN p_type_remunerations as rem ON rem.id = conf.typeRemunerationId
      WHERE inf.id = ${this.params()[0].name}
      AND NOT EXISTS(
        SELECT null FROM p_info_type_remunerations
        WHERE infoId = inf.id AND typeRemunerationId = rem.id
      );
      `
    )
  }

  private queryTypeDiscounts() {
    return (
      `
      INSERT INTO p_info_type_discounts(infoId, typeDiscountId, amount)
      SELECT inf.id, dis.id, conf.amount FROM p_infos as inf 
      INNER JOIN p_contracts as cont ON cont.id = inf.contractId
      INNER JOIN p_config_type_discounts as conf ON conf.planillaId = inf.planillaId AND conf.typeCategoryId = cont.typeCategoryId
      INNER JOIN p_type_discounts as dis ON dis.id = conf.typeDiscountId
      WHERE inf.id = ${this.params()[0].name}
      AND NOT EXISTS(
        SELECT null FROM p_info_type_discounts
        WHERE infoId = inf.id AND typeDiscountId = dis.id
      );
      `
    )
  }

  private queryTypeAportations() {
    return (
      `
      INSERT INTO p_info_type_aportations(infoId, typeAportationId)
      SELECT inf.id, apo.id FROM p_infos as inf 
      INNER JOIN p_contracts as cont ON cont.id = inf.contractId
      INNER JOIN p_config_type_aportations as conf ON conf.planillaId = inf.planillaId AND conf.typeCategoryId = cont.typeCategoryId
      INNER JOIN p_type_aportations as apo ON apo.id = conf.typeAportationId
      WHERE inf.id = ${this.params()[0].name}
      AND NOT EXISTS(
        SELECT null FROM p_info_type_aportations
        WHERE infoId = inf.id AND typeAportationId = apo.id
      );
      `
    )
  }
}