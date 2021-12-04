import { Injectable } from '@nestjs/common';
import { AddInfosProcedured } from 'src/modules/cronogramas/domain/procedured/add-infos.procedured';
import { CopyCronogramaProcedured } from '../modules/cronogramas/domain/procedured/copy-cronograma.procedured';
import { AddRemuneracionesProcedured } from '../modules/cronogramas/domain/procedured/add-remuneraciones.procedured'
import { AddDescuentosProcedured } from '../modules/cronogramas/domain/procedured/add-descuentos.procedured';
import { ConfigAfpProcedured } from '../modules/cronogramas/domain/procedured/config-afp.procedured';
import { AddAportacionesProcedured } from '../modules/cronogramas/domain/procedured/add-aportaciones.procedured';
import { ConfigEdadProcedured } from '../modules/cronogramas/domain/procedured/config-edad.procedured';
import { ConfigPagoProcedured } from '../modules/cronogramas/domain/procedured/config-pago.procedured';
import { UpdateCalcRemuneracionDiaProcedured } from '../modules/cronogramas/domain/procedured/update-calc-remuneracion-dia.procedured';
import { ClearPayProcedured } from '../modules/cronogramas/domain/procedured/clear-pay.procedured';
import { AddObligacionProcedured } from '../modules/cronogramas/domain/procedured/add-obligacion.procedured';
import { UpdateObligacionProcedured } from '../modules/cronogramas/domain/procedured/update-obligacion.procedured';
import { UpdateAfpAporteProcedured } from '../modules/cronogramas/domain/procedured/update-afp-aporte.procedured';
import { UpdateAfpPrimaProcedured } from '../modules/cronogramas/domain/procedured/update-afp-prima.procedured';
import { UpdateAfpTypeProcedured } from '../modules/cronogramas/domain/procedured/update-afp-type.procedured';
import { AddSindicatoProcedured } from '../modules/cronogramas/domain/procedured/add-sindicato.procedured';
import { UpdateSindicatoProcedured } from '../modules/cronogramas/domain/procedured/update-sindicato.procedured'
import { UpdateAportacionProcedured } from '../modules/cronogramas/domain/procedured/update-aportacion.procedured';
import { UpdateDescuentoEscalafonProcedured } from '../modules/cronogramas/domain/procedured/update-descuento-escalafon.procedured';
import { AddRemuneracionInfosProcedure } from '../modules/type-remunerations/domain/procedured/add-remuneracion-infos.procedured';

@Injectable()
export class Seeder {
  async seed() {
    (new AddInfosProcedured).up();
    (new AddRemuneracionesProcedured).up();
    (new AddDescuentosProcedured).up();
    (new ConfigAfpProcedured).up();
    (new AddAportacionesProcedured).up();
    (new ConfigEdadProcedured).up();
    (new ConfigPagoProcedured).up();
    (new UpdateCalcRemuneracionDiaProcedured).up();
    (new ClearPayProcedured).up();
    (new AddObligacionProcedured).up();
    (new UpdateObligacionProcedured).up();
    (new UpdateAfpAporteProcedured).up();
    (new UpdateAfpPrimaProcedured).up();
    (new UpdateAfpTypeProcedured).up();
    (new AddSindicatoProcedured).up();
    (new UpdateSindicatoProcedured).up();
    (new UpdateAportacionProcedured).up();
    (new UpdateDescuentoEscalafonProcedured).up();
    (new CopyCronogramaProcedured).up();
    (new AddRemuneracionInfosProcedure).up();
  }
}