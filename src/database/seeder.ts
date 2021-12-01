import { Injectable } from '@nestjs/common';
import { CopyCronogramaProcedured } from '../modules/cronogramas/domain/procedured/copy-crongrama.procedured'

@Injectable()
export class Seeder {
  async seed() {
    (new CopyCronogramaProcedured).up();
  }
}