import { DatabaseProcedured, ParamProcedured, paramModeProcedured } from 'src/database/database.procedured';

export class AddInfosProcedured extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = AddInfosProcedured.name;

  public params(): ParamProcedured[] {
      return [
        { 
          name: "p_cronograma_id",
          type: "BIGINT",
          mode: paramModeProcedured.IN,
          length: 20
        },
        { 
          name: "p_info_id",
          type: "VARCHAR",
          mode: paramModeProcedured.IN,
          length: 10000
        }
      ]
  }

  public call(cronogramaId: number, infoIds = '0'): Promise<any> {
    return super.call(cronogramaId, infoIds);
  }

  public query() {
    return (
      `
        IF(p_info_id = '0') THEN
          ${this.addAll()}
        ELSE  
          ${this.addForIds()}
        END IF;

        ${this.calcDays()}
      `
    )
  }

  private addAll() {
    return `
      INSERT INTO historials(work_id, info_id, planilla_id, cargo_id, type_categoria_id, meta_id,
      cronograma_id, dependencia_id, afp_id, numero_de_cussp, fecha_de_afiliacion, banco_id, numero_de_cuenta,
      numero_de_essalud, plaza, ruc, perfil_laboral_id, pap, observacion, prima_seguro, situacion_laboral_id, is_pay, dias, sync)
      SELECT inf.work_id, inf.id as info_id, inf.planilla_id, inf.cargo_id,
      inf.type_categoria_id, inf.meta_id, cro.id as cronograma_id, inf.dependencia_id,
      w.afp_id, w.numero_de_cussp, w.fecha_de_afiliacion,
      w.banco_id, w.numero_de_cuenta, w.numero_de_essalud, inf.plaza, inf.ruc,
      inf.perfil_laboral_id, inf.pap, inf.observacion, w.prima_seguro, inf.situacion_laboral_id, inf.is_pay, cro.dias, IF(cro.remanente = 1, 0, 1)
      FROM infos AS inf
      INNER JOIN works as w ON w.id = inf.work_id
      INNER JOIN cronogramas as cro ON cro.planilla_id = inf.planilla_id AND inf.entity_id = cro.entity_id
      WHERE cro.id = p_cronograma_id AND inf.estado = 1
      AND NOT EXISTS (SELECT null FROM historials AS h WHERE h.info_id = inf.id AND h.cronograma_id = p_cronograma_id);
    `
  }

  private addForIds() {
    return `
      SET @v_query := CONCAT('INSERT INTO historials(work_id, info_id, planilla_id, cargo_id, type_categoria_id, meta_id,
      cronograma_id, dependencia_id, afp_id, numero_de_cussp, fecha_de_afiliacion, banco_id, numero_de_cuenta,
      numero_de_essalud, plaza, ruc, perfil_laboral_id, pap, observacion, prima_seguro, situacion_laboral_id, is_pay, dias, sync)
      SELECT inf.work_id, inf.id as info_id, inf.planilla_id, inf.cargo_id,
      inf.type_categoria_id, inf.meta_id, cro.id as cronograma_id, inf.dependencia_id,
      w.afp_id, w.numero_de_cussp, w.fecha_de_afiliacion,
      w.banco_id, w.numero_de_cuenta, w.numero_de_essalud, inf.plaza, inf.ruc,
      inf.perfil_laboral_id, inf.pap, inf.observacion, w.prima_seguro, inf.situacion_laboral_id, inf.is_pay, cro.dias, IF(cro.remanente = 1, 0, 1)
      FROM infos AS inf
      INNER JOIN works as w ON w.id = inf.work_id
      INNER JOIN cronogramas as cro ON cro.planilla_id = inf.planilla_id AND inf.entity_id = cro.entity_id
      WHERE cro.id = ', p_cronograma_id, ' AND inf.estado = 1 AND inf.id in (', p_info_id, ')
      AND NOT EXISTS (SELECT null FROM historials AS h WHERE h.info_id = inf.id AND h.cronograma_id = ', p_cronograma_id, ');');
      PREPARE myQuery FROM @v_query;
      EXECUTE myQuery;
      DEALLOCATE PREPARE myQuery;
    `
  }

  private calcDays() {
    return `
      UPDATE cronogramas as cro 
      INNER JOIN historials as his ON his.cronograma_id = cro.id
      INNER JOIN infos as inf ON his.info_id = inf.id
      SET his.dias = IF(inf.fecha_de_ingreso is not NULL AND inf.fecha_de_ingreso is not null, 
      IF(YEAR(inf.fecha_de_ingreso) = YEAR(NOW()) AND MONTH(inf.fecha_de_ingreso) = MONTH(NOW()),
      DAY(inf.fecha_de_cese) - DAY(inf.fecha_de_ingreso),
      IF(DAY(inf.fecha_de_cese) > 30, 30, DAY(inf.fecha_de_cese))),
      IF(DAY(fecha_de_cese) > 30, 30, DAY(fecha_de_cese)))
      WHERE cro.id = p_cronograma_id
      AND (inf.fecha_de_cese is not null OR inf.fecha_de_cese is not null)
      AND YEAR(inf.fecha_de_cese) = YEAR(NOW()) AND MONTH(inf.fecha_de_cese) = MONTH(NOW())
      AND cro.estado = 1 AND inf.estado = 1;
    `
  }
}