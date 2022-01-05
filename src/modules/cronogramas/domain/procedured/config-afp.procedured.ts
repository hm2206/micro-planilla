import {
  DatabaseProcedured,
  ParamProcedured,
  paramModeProcedured
} from '../../../../database/database.procedured';

export class ConfigAfpProcedured extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = ConfigAfpProcedured.name;

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
        INSERT INTO config_afps(afp_id, cronograma_id, type_descuento_id, porcentaje, aporte_descuento_id, aporte,
        prima_descuento_id, prima, prima_limite)
        SELECT af.id, p_cronograma_id, af.type_descuento_id, af.porcentaje, af.aporte_descuento_id, af.aporte,
        af.prima_descuento_id, af.prima, af.prima_limite
        FROM afps as af WHERE NOT EXISTS (
        SELECT null FROM config_afps as conf WHERE conf.afp_id = af.id AND conf.cronograma_id = p_cronograma_id);
        UPDATE afps as af
        INNER JOIN config_afps as conf ON conf.afp_id = af.id AND conf.cronograma_id = p_cronograma_id
        SET conf.type_descuento_id = af.type_descuento_id,
        conf.porcentaje = af.porcentaje,
        conf.aporte_descuento_id = af.aporte_descuento_id,
        conf.aporte = af.aporte,
        conf.prima_descuento_id = af.prima_descuento_id,
        conf.prima = af.prima,
        conf.prima_limite = af.prima_limite;
      `
    )
  }
}