import { PimLogsService } from "../../../modules/pim-logs/application/pim-logs.service";
import { EventSubscriber, EntitySubscriberInterface, Connection, InsertEvent } from "typeorm";
import { PimEntity } from "./pim.entity";

@EventSubscriber()
export class PimSubscriber implements EntitySubscriberInterface<PimEntity> {
  constructor(
    private connection: Connection,
    private pimLogsService: PimLogsService) {
    this.connection.subscribers.push(this);
  }

  public listenTo(): any {
    return PimEntity;
  }

  public afterLoad(entity: PimEntity): void {
    const diff = entity.amount - entity.executedAmount;
    entity.diffAmount = diff;
  }

  public afterInsert(event: InsertEvent<PimEntity>): void {
    const pimEntity = event.entity;
    this.pimLogsService.createPimLog({
      pimId: pimEntity.id,
      amount: pimEntity.amount,
      date: new Date(),
      isDefault: true
    });
  }
}