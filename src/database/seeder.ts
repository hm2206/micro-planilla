import { Injectable } from '@nestjs/common';
// import { AddInfosProcedured } from '../modules/cronogramas/domain/procedured/add-infos.procedured';
// import { CopyCronogramaProcedured } from '../modules/cronogramas/domain/procedured/copy-cronograma.procedured';
// import { UpdateAportacionProcedured } from '../modules/cronogramas/domain/procedured/update-aportacion.procedured';
// import { UpdateDescuentoEscalafonProcedured } from '../modules/cronogramas/domain/procedured/update-descuento-escalafon.procedured';
// import { AddRemuneracionInfosProcedure } from '../modules/type-remunerations/domain/procedured/add-remuneracion-infos.procedured';

import { AddConfigInfosProcedure } from '../modules/infos/domain/procedured/add-config-infos.procedured';
import { AddHistorialsProcedured } from '../modules/historial/domain/procedured/add-historials.procedured';
import { CalcDaysHistorialsProcedured } from '../modules/historial/domain/procedured/calc-days-historials.procedured';
import { AddRemunerationsProcedured } from '../modules/remunerations/domain/procedured/add-remunerations.procedured';
import { AddDiscountsProcedured } from '../modules/discounts/domain/procedured/add-discounts.procedured';
import { AddAportationsProcedured } from '../modules/aportations/domain/procedured/add-aportations.procedured';
import { CalcRemunerationsProcedured } from '../modules/remunerations/domain/procedured/calc-remuneration.procedured';
import { CalcAfpsProcedured } from 'src/modules/discounts/domain/procedured/calc-afps.procedured';
import { CalcConfigCronogramaProcedured } from 'src/modules/cronogramas/domain/procedured/calc-config-cronograma.procedured';
import { CalcObligationsProcedured } from 'src/modules/obligations/domain/procedured/calc-obligations.procedured';
import { CalcAffiliationsProcedured } from 'src/modules/affiliations/domain/procedured/calc-affiliations.procedured';
import { CalcDiscountsProcedured } from 'src/modules/discounts/domain/procedured/calc-discounts.procedured';

@Injectable()
export class Seeder {
  async seed() {
    await (new AddConfigInfosProcedure).up();
    await (new CalcConfigCronogramaProcedured).up();
    await (new AddHistorialsProcedured).up();
    await (new CalcDaysHistorialsProcedured).up();
    await (new AddRemunerationsProcedured).up();
    await (new CalcRemunerationsProcedured).up();
    await (new AddDiscountsProcedured).up();
    await (new CalcObligationsProcedured).up();
    await (new CalcAffiliationsProcedured).up();
    await (new CalcAfpsProcedured).up();
    await (new CalcDiscountsProcedured).up();
    await (new AddAportationsProcedured).up();
  }
}