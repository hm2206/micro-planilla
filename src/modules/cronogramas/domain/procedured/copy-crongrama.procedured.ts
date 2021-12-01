import { DatabaseProcedured, ParamProcedured, paramModeProcedured } from 'src/database/database.procedured';

export class CopyCronogramaProcedured extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = CopyCronogramaProcedured.name;

  public params(): ParamProcedured[] {
      return [
        { 
          name: "p_cronograma_copy_id",
          type: "BIGINT",
          mode: paramModeProcedured.IN,
          length: 20
        },
        { 
          name: "p_cronograma_actual_id",
          type: "BIGINT",
          mode: paramModeProcedured.IN,
          length: 20
        }
      ]
  }

  public query() {
    return (
      `
        INSERT INTO historials(work_id, info_id, planilla_id, cargo_id, type_categoria_id,
        meta_id, cronograma_id, dependencia_id, afp_id, numero_de_cussp, fecha_de_afiliacion,
        banco_id, numero_de_cuenta, numero_de_essalud, plaza, ruc, perfil_laboral_id, pap,
        observacion, prima_seguro, is_pay, situacion_laboral_id)
        SELECT his.work_id, his.info_id, his.planilla_id, inf.cargo_id,
        inf.type_categoria_id, inf.meta_id, p_cronograma_copy_id as cronograma_id,
        inf.dependencia_id, w.afp_id, w.numero_de_cussp, w.fecha_de_afiliacion,
        w.banco_id, w.numero_de_cuenta, w.numero_de_essalud, inf.plaza,
        inf.ruc, inf.perfil_laboral_id, inf.pap, inf.observacion,
        w.prima_seguro, inf.is_pay, inf.situacion_laboral_id
        FROM historials as his
        INNER JOIN infos as inf ON inf.id = his.info_id
        INNER JOIN works as w ON w.id = inf.work_id
        WHERE his.cronograma_id = p_cronograma_actual_id;
      `
    )
  }
}