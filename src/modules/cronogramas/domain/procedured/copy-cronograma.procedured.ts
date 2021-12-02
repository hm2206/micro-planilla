import { DatabaseProcedured, ParamProcedured, paramModeProcedured } from 'src/database/database.procedured';

export class CopyCronogramaProcedured extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = CopyCronogramaProcedured.name;

  public params(): ParamProcedured[] {
      return [
        { 
          name: "p_cronograma_source_id",
          type: "BIGINT",
          mode: paramModeProcedured.IN,
          length: 20
        },
        { 
          name: "p_cronograma_target_id",
          type: "BIGINT",
          mode: paramModeProcedured.IN,
          length: 20
        }
      ]
  }

  public call(sourceId: number, targetId: number): Promise<any> {
    return super.call(sourceId, targetId);
  }

  public query() {
    return (
      `
        ${this.queryCopy()}
        ${this.queryRemuneraciones()}
        ${this.queryDescuentos()}
        ${this.queryDetalles()}
      `
    )
  }

  private queryCopy() {
    return `
      INSERT INTO historials(work_id, info_id, planilla_id, cargo_id, type_categoria_id,
      meta_id, cronograma_id, dependencia_id, afp_id, numero_de_cussp, fecha_de_afiliacion,
      banco_id, numero_de_cuenta, numero_de_essalud, plaza, ruc, perfil_laboral_id, pap,
      observacion, prima_seguro, is_pay, situacion_laboral_id)
      SELECT his.work_id, his.info_id, his.planilla_id, inf.cargo_id,
      inf.type_categoria_id, inf.meta_id, p_cronograma_target_id as cronograma_id,
      inf.dependencia_id, w.afp_id, w.numero_de_cussp, w.fecha_de_afiliacion,
      w.banco_id, w.numero_de_cuenta, w.numero_de_essalud, inf.plaza,
      inf.ruc, inf.perfil_laboral_id, inf.pap, inf.observacion,
      w.prima_seguro, inf.is_pay, inf.situacion_laboral_id
      FROM historials as his
      INNER JOIN infos as inf ON inf.id = his.info_id
      INNER JOIN works as w ON w.id = inf.work_id
      WHERE his.cronograma_id = p_cronograma_source_id;
    `
  }

  private queryRemuneraciones() {
    return `
      INSERT INTO remuneracions(historial_id, type_remuneracion_id, monto, base, bonificacion, edit, orden)
      SELECT h.id, rem.type_remuneracion_id,
      rem.monto, rem.base, rem.bonificacion, rem.edit,
      rem.orden
      FROM remuneracions as rem 
      INNER JOIN historials as his ON his.id = rem.historial_id
      INNER JOIN historials as h ON h.info_id = his.info_id AND h.cronograma_id = p_cronograma_target_id
      WHERE his.cronograma_id = p_cronograma_source_id;
    `
  }

  private queryDescuentos() {
    return `
      INSERT INTO descuentos(historial_id, monto, type_descuento_id, 
      orden, edit, plame, judicial, except, \`modify\`)
      SELECT h.id, des.monto, des.type_descuento_id, des.orden, 
      des.edit, des.plame, des.judicial, des.except, des.\`modify\`
      FROM descuentos as des
      INNER JOIN historials as his ON his.id = des.historial_id
      INNER JOIN historials as h ON h.info_id = his.info_id AND h.cronograma_id = p_cronograma_target_id
      WHERE his.cronograma_id = p_cronograma_source_id;
    `
  }

  private queryDetalles() {
    return `
      INSERT INTO detalles(historial_id, type_detalle_id, type_descuento_id,
      porcentaje, monto, descripcion)
      SELECT h.id, det.type_detalle_id, det.type_descuento_id, 
      det.porcentaje, det.monto, det.descripcion
      FROM detalles as det
      INNER JOIN historials as his ON his.id = det.historial_id
      INNER JOIN historials as h ON h.info_id = his.info_id AND h.cronograma_id = p_cronograma_target_id
      WHERE his.cronograma_id = p_cronograma_source_id;
    `
  }
}