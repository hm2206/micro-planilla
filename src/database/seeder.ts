import { Injectable } from '@nestjs/common';
import { AddConfigInfosProcedure } from '../modules/infos/domain/procedured/add-config-infos.procedured';
import { AddHistorialsProcedured } from '../modules/historial/domain/procedured/add-historials.procedured';
import { CalcDaysHistorialsProcedured } from '../modules/historial/domain/procedured/calc-days-historials.procedured';
import { AddRemunerationsProcedured } from '../modules/remunerations/domain/procedured/add-remunerations.procedured';
import { AddDiscountsProcedured } from '../modules/discounts/domain/procedured/add-discounts.procedured';
import { AddAportationsProcedured } from '../modules/aportations/domain/procedured/add-aportations.procedured';
import { CalcRemunerationsProcedured } from '../modules/remunerations/domain/procedured/calc-remuneration.procedured';
import { CalcAfpsProcedured } from '../modules/afps/domain/procedured/calc-afps.procedured';
import { CalcConfigCronogramaProcedured } from '../modules/cronogramas/domain/procedured/calc-config-cronograma.procedured';
import { CalcObligationsProcedured } from '../modules/obligations/domain/procedured/calc-obligations.procedured';
import { CalcAffiliationsProcedured } from '../modules/affiliations/domain/procedured/calc-affiliations.procedured';
import { CalcDiscountsProcedured } from '../modules/discounts/domain/procedured/calc-discounts.procedured';
import { AddHistorialIdsProcedured } from '../modules/historial/domain/procedured/add-historial-ids.procedured';
import { CalcPimYearProcedured } from '../modules/pims/domain/procedured/calc-pim-year.procedured';
import { DisabledContractsProcedured } from '../modules/contracts/domain/procedured/disabled-contracts.procedured';
import { DisabledInfosProcedured } from '../modules/infos/domain/procedured/disabled-infos.procedured';

@Injectable()
export class Seeder {
  async seed() {
    await (new AddConfigInfosProcedure).up();
    await (new CalcConfigCronogramaProcedured).up();
    await (new AddHistorialsProcedured).up();
    await (new AddHistorialIdsProcedured).up();
    await (new CalcDaysHistorialsProcedured).up();
    await (new AddRemunerationsProcedured).up();
    await (new CalcRemunerationsProcedured).up();
    await (new AddDiscountsProcedured).up();
    await (new CalcObligationsProcedured).up();
    await (new CalcAffiliationsProcedured).up();
    await (new CalcAfpsProcedured).up();
    await (new CalcDiscountsProcedured).up();
    await (new AddAportationsProcedured).up();
    await (new CalcPimYearProcedured).up();
    await (new DisabledContractsProcedured).up();
    await (new DisabledInfosProcedured).up();
  }
}