import {
  DatabaseProcedured,
  ParamProcedured,
  paramModeProcedured
} from '../../../../database/database.procedured';

export class UpdateDescuentoEscalafonProcedured extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = UpdateDescuentoEscalafonProcedured.name;

  public params(): ParamProcedured[] {
      return [
        { 
          name: "p_cronograma_id",
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
        UPDATE \`descuentos\` as des
        INNER JOIN type_descuentos as type ON type.id = des.type_descuento_id
        INNER JOIN historials as his ON his.id = des.historial_id
        SET des.monto = 0
        WHERE type.is_escalafon = 1
        AND his.cronograma_id = p_cronograma_id
        AND des.edit = 0;
        UPDATE descuentos as d
        INNER JOIN (SELECT des.id, SUM(dis.monto) as monto
        FROM descuentos as des
        INNER JOIN historials as his ON des.historial_id = his.id
        INNER JOIN discount_detalles as dis ON dis.descuento_id = des.id
        WHERE his.cronograma_id = p_cronograma_id GROUP BY des.id)
        as up ON up.id = d.id
        SET d.monto = up.monto, d.edit = 0, d.modify = 0;
      `
    )
  }
}