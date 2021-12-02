import { Injectable } from '@nestjs/common';
import { AddInfosProcedured } from 'src/modules/cronogramas/domain/procedured/add-infos.procedured';
import { CopyCronogramaProcedured } from '../modules/cronogramas/domain/procedured/copy-cronograma.procedured'

@Injectable()
export class Seeder {
  async seed() {
    (new AddInfosProcedured).up();
    (new CopyCronogramaProcedured).up();
  }
}