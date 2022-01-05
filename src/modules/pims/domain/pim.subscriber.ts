import { PimLogsService } from "../../../modules/pim-logs/application/pim-logs.service";
import { EventSubscriber, EntitySubscriberInterface, Connection, InsertEvent, UpdateEvent } from "typeorm";
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

  public afterInsert(event: InsertEvent<PimEntity>): void {
    const pimEntity = event.entity;
    this.pimLogsService.createPimLog({
      pimId: pimEntity.id,
      money: pimEntity.money,
      date: new Date(),
      isDefault: true
    });
  }

  public afterUpdate(event: UpdateEvent<PimEntity>): void {
    const pimEntity = event.entity;
    this.pimLogsService.createPimLog({
      pimId: pimEntity.id,
      money: pimEntity.money,
      date: new Date(),
      isDefault: false
    });
  }
}