import { DatabaseProcedured, ParamProcedured, paramModeProcedured } from 'src/database/database.procedured';

export class AddRemuneracionInfosProcedure extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = AddRemuneracionInfosProcedure.name;

  public params(): ParamProcedured[] {
      return [
        { 
          name: "p_type_remuneracion_id",
          type: "BIGINT",
          mode: paramModeProcedured.IN,
          length: 20
        },
        { 
          name: "p_planilla_id",
          type: "BIGINT",
          mode: paramModeProcedured.IN,
          length: 20
        },
        { 
          name: "p_meta_id",
          type: "BIGINT",
          mode: paramModeProcedured.IN,
          length: 20
        },
        { 
          name: "p_cargo_id",
          type: "BIGINT",
          mode: paramModeProcedured.IN,
          length: 20
        },
        { 
          name: "p_type_categoria_id",
          type: "BIGINT",
          mode: paramModeProcedured.IN,
          length: 20
        }
      ]
  }

  public call(typeRemuneracionId: number, planillaId = 0, metaId = 0, cargoId = 0, typeCategoriaId = 0): Promise<any> {
    return super.call(typeRemuneracionId, planillaId, metaId, cargoId, typeCategoriaId);
  }

  public query() {
    return (
      `
      INSERT INTO config_infos(info_id, type_remuneracion_id, monto, base)
      SELECT info.id, cat.type_remuneracion_id, cat.monto, type.base
      FROM categorias AS cat
      INNER JOIN infos AS info ON info.type_categoria_id = cat.type_categoria_id AND cat.planilla_id = info.planilla_id
      INNER JOIN type_remuneracions AS type ON type.id = cat.type_remuneracion_id
      where IF(p_planilla_id = 0, 1, info.planilla_id = p_planilla_id)
      AND IF(p_cargo_id = 0, 1, info.cargo_id = p_cargo_id)
      AND IF(p_type_categoria_id = 0, 1, info.type_categoria_id = p_type_categoria_id)
      AND IF(meta_id = 0, 1, info.meta_id = meta_id)
      AND cat.type_remuneracion_id = p_type_remuneracion_id
      AND info.estado = 1
      AND NOT EXISTS (
      SELECT NULL FROM config_infos AS con 
      WHERE con.type_remuneracion_id = cat.type_remuneracion_id
      AND con.info_id = info.id);
      `
    )
  }
}