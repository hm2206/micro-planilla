import { Inject, forwardRef, InternalServerErrorException } from "@nestjs/common";
import { PimsService } from "src/modules/pims/application/pims.service";
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";
import { PimLogEntity } from "./pim-log.entity";
import { PimLogModeEnum } from "./pim-log.enum";

@EventSubscriber()
export class PimLogSubscriber implements EntitySubscriberInterface<PimLogEntity> {
  constructor(connection: Connection,
    @Inject(forwardRef(() => PimsService))
    private pimsService: PimsService) {
    connection.subscribers.push(this);
  }

  public listenTo(): any {
    return PimLogEntity;
  }

  public async beforeInsert(event: InsertEvent<PimLogEntity>): Promise<any | void> {
    const pimLog = event.entity;

    // next
    if (pimLog.isDefault) return;

    // el amount debe ser mayor a cero
    if (!pimLog.amount) throw new InternalServerErrorException;

    // validar pim
    const pim = await this.pimsService.findPim(pimLog.pimId);
    
    // setting data    
    const pimAmount = parseFloat(`${pim.amount}`);
    const pimLogAmount = parseFloat(`${pimLog.amount}`);
    const pimExecutedAmount = parseFloat(`${pim.executedAmount}`);
    const pimDiffAmount = parseFloat(`${pim.diffAmount}`);

    /** 
     * Aumentar monto del PIM
    */
    if (pimLog.mode == PimLogModeEnum.ENTRY) {
      const aumentAmount: number = pimAmount + pimLogAmount;
      return await this.pimsService.editPimAmount(pim.id, aumentAmount);
    }
    
    /**
     *  Validar Disminución del monto del PIM
     */
    if (pimLog.mode == PimLogModeEnum.EGRESS) {
      
      // validar amount
      if (pimDiffAmount > pimExecutedAmount) throw new InternalServerErrorException(
        `El monto debe ser menor/igual al saldo del PIM`
      )
      
      const disminAmount = pimAmount - pimLogAmount;
      return await this.pimsService.editPimAmount(pim.id, disminAmount);

    }
    
  }
}