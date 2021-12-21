import { Injectable } from '@nestjs/common';
import { CronogramaRepository } from '../domain/cronograma.repository';
import { FilterTypeObject } from '../application/dtos/filter-type.dto';
import * as xlsx from 'excel4node';
import { Collection } from 'collect.js';
import { DateTime } from "luxon";

@Injectable()
export class ReportGeneralService {
  constructor(private cronogramaRepository: CronogramaRepository) {}

  public async excel(id: number, filters: FilterTypeObject) {
    try {
      const tableInit = 5;
      // obtener datos
      const cronograma = await this.cronogramaRepository.findOneOrFail(id);
      const typeRemunerations = await this.cronogramaRepository.getTypeRemunerations(id, filters); 
      const typeDescuentos = await this.cronogramaRepository.getTypeDescuentos(id, filters);
      const typeAportaciones = await this.cronogramaRepository.getTypeAportaciones(id, filters);
      const totalHistorial = await this.cronogramaRepository.getCountHistorial(id, filters);
      // contar types
      const countRemu = typeRemunerations.length + tableInit;
      const countDesc = typeDescuentos.length + tableInit;
      const countApot = typeAportaciones.length + tableInit;
      const countBase = countApot + tableInit;
      const countHist = countBase + 3;
      const [countLast] = [countRemu, countDesc, countApot].sort((a, b) => b - a);
      // obtener totales
      const totalBruto = new Collection(typeRemunerations).sum('price') as number;
      const totalDesct = new Collection(typeDescuentos).sum('price') as number;
      const totalAport = new Collection(typeAportaciones).sum('price') as number;
      const totalBase = new Collection(typeRemunerations).where('base', 0).sum('price') as number;
      const totalNeto: number = totalBruto - totalDesct;
      // generar libro de excel
      const workbook = new xlsx.Workbook();
      // formater price
      const stylesMoney = workbook.createStyle({
        numberFormat: "#,##0.00; (#,##0.00); -",
      });
      // formater headers
      const styles = workbook.createStyle({
        alignment: {
          horizontal: 'center',
        },
      });
      // agregar page
      const worksheet = workbook.addWorksheet('Sheet 1');
      // agregar title
      const currentDate = DateTime.fromISO(
        new Date(`${cronograma.year}-${cronograma.mes}-01`).toISOString(),
        { locale: "pe" }
      );
      const title = `RESUMEN ${currentDate.toFormat('LLL yyyy')}`.toUpperCase();
      worksheet.cell(1, 1, 1, 11, true).string(title).style(styles);
      // agregar cabezeras
      worksheet.cell(3, 1, 3, 3, true).string(`REMUNERACIÓN`).style(styles);
      worksheet.cell(3, 5, 3, 7, true).string(`DESCUENTOS`).style(styles);
      worksheet.cell(3, 9, 3, 11, true).string(`APORTES DE LA PATRONAL`).style(styles);
      // agregar remuneraciones
      typeRemunerations.forEach((d, index) => {
        const position: number = tableInit + index;
        worksheet.column(2).setWidth(50);
        worksheet.cell(position, 1).string(`${d.key}.-`);
        worksheet.cell(position, 2).string(`${d.descripcion}`);
        worksheet.cell(position, 3).number(parseFloat(d.price)).style(stylesMoney);
      });
      // agregar descuentos
      typeDescuentos.forEach((d, index) => {
        const position: number = tableInit + index;
        worksheet.column(6).setWidth(30);
        worksheet.cell(position, 5).string(`${d.key}.-`);
        worksheet.cell(position, 6).string(`${d.descripcion}`);
        worksheet.cell(position, 7).number(parseFloat(d.price)).style(stylesMoney);
      });
      // agregar aportaciones
      typeAportaciones.forEach((d, index) => {
        const position: number = tableInit + index;
        worksheet.column(10).setWidth(20);
        worksheet.cell(position, 9).string(`${d.key}.-`);
        worksheet.cell(position, 10).string(`${d.descripcion}`);
        worksheet.cell(position, 11).number(parseFloat(d.price)).style(stylesMoney);
      });
      // agregar totales
      worksheet.cell(countLast, 1, countLast, 2, true).string("TOTAL REMUNERACIÓN").style(styles);
      worksheet.cell(countLast, 3).number(totalBruto).style(stylesMoney);
      worksheet.cell(countLast, 5, countLast, 6, true).string("TOTAL DESCUENTOS").style(styles);
      worksheet.cell(countLast, 7).number(totalDesct).style(stylesMoney);
      worksheet.cell(countApot, 9, countApot, 10, true).string("TOTAL APORTACIONES").style(styles);
      worksheet.cell(countApot, 11).number(totalAport).style(stylesMoney);
      worksheet.cell(countBase, 9, countBase, 10, true).string("BASE IMPONIBLE").style(styles);
      worksheet.cell(countBase, 11).number(totalBase).style(stylesMoney);
      worksheet.cell(countHist, 9, countHist, 10, true).string("P.E.A").style(styles);
      worksheet.cell(countHist, 11).number(totalHistorial);
      worksheet.cell(countLast, 9, countLast, 10, true).string("TOTAL A PAGAR").style(styles);
      worksheet.cell(countLast, 11).number(totalNeto).style(stylesMoney);
      // obtener Excel
      const result = await workbook.writeToBuffer();
      return result
    } catch (error) {
      
    }
  }

}