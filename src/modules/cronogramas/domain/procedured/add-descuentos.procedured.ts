import { DatabaseProcedured, ParamProcedured, paramModeProcedured } from 'src/database/database.procedured';

export class AddDescuentosProcedured extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = AddDescuentosProcedured.name;

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
        INSERT INTO descuentos(historial_id, type_descuento_id, monto, orden, edit, plame, judicial, except)
        SELECT his.id as historial_id, type.id as type_descuento_id, IF(cro.remanente = 1, 0,  c.monto), 
        type.orden, IF(cro.remanente = 1, 1, type.edit), type.plame, type.judicial, type.except
        FROM historials as his
        INNER JOIN info_type_descuentos as c ON c.info_id = his.info_id
        INNER JOIN type_descuentos as type ON type.id = c.type_descuento_id
        INNER JOIN cronogramas as cro ON cro.id = his.cronograma_id
        WHERE his.cronograma_id = p_cronograma_id
        AND NOT EXISTS (SELECT null FROM descuentos as des WHERE des.type_descuento_id = type.id AND des.historial_id = his.id);
      `
    )
  }
}