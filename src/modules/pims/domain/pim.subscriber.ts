import { EventSubscriber, EntitySubscriberInterface, Connection, InsertEvent } from "typeorm";
import { PimEntity } from "./pim.entity";

@EventSubscriber()
export class PimSubscriber implements EntitySubscriberInterface<PimEntity> {
  constructor(private connection: Connection) {
    this.connection.subscribers.push(this);
  }

  public listenTo(): any {
    return PimEntity;
  }

  public afterInsert(event: InsertEvent<PimEntity>): void {
    const pimEntity = event.entity;
    console.log(pimEntity);
  }
}