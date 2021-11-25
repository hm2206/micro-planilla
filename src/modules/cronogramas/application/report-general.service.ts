import { Injectable } from '@nestjs/common';
import { CronogramaRepository } from '../domain/cronograma.repository';
import { FilterTypeObject } from '../domain/cronograma.dto.ts';
import * as xlsx from 'excel4node';

@Injectable()
export class ReportGeneralService {
  constructor(private cronogramaRepository: CronogramaRepository) {}

  public async excel(id: number, filters: FilterTypeObject) {
    // obtener datos
    const typeRemunerations = await this.cronogramaRepository.getTypeRemunerations(id, filters); 
    const typeDescuentos = await this.cronogramaRepository.getTypeDescuentos(id, filters);
    const typeAportaciones = await this.cronogramaRepository.getTypeAportaciones(id, filters);
    // generar libro de excel
    const workbook = new xlsx.Workbook();
    const styles = workbook.createStyle({
      alignment: {
        horizontal: 'center',
      },
    });
    // agregar page
    const worksheet = workbook.addWorksheet('Sheet 1');
    // agregar title
    worksheet.cell(1, 1, 1, 11, true).string(`RESUMEN AGOSTO 2018 PERSONAL ADMINISTRATIVO NOMBRADO`).style(styles);
    // agregar cabezeras
    worksheet.cell(3, 1, 3, 3, true).string(`REMUNERACIÓN`).style(styles);
    worksheet.cell(3, 5, 3, 7, true).string(`DESCUENTOS`).style(styles);
    worksheet.cell(3, 9, 3, 11, true).string(`APORTES DE LA PATRONAL`).style(styles);
    // agregar remuneraciones
    typeRemunerations.forEach((d, index) => {
      const position: number = 5 + index;
      worksheet.cell(position, 1).string(`${d.key}.-`);
    });
    // agregar descuentos
    typeDescuentos.forEach((d, index) => {
      const position: number = 5 + index;
      worksheet.cell(position, 5).string(`${d.key}.-`);

    });
    // agregar aportaciones
    typeAportaciones.forEach((d, index) => {
      const position: number = 5 + index;
      worksheet.cell(position, 9).string(`${d.key}.-`);
    });
    // obtener Excel
    const result = await workbook.writeToBuffer();
    return result
  }

}