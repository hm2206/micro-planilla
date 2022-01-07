import { EventSubscriber, EntitySubscriberInterface, Connection, InsertEvent } from "typeorm";
import { WorksService } from "../application/works.service";
import { WorkEntity } from "./work.entity";

@EventSubscriber()
export class WorkSubscription implements EntitySubscriberInterface<WorkEntity> {
  constructor(
    private workService: WorksService,
    private connection: Connection) {
    this.connection.subscribers.push(this);
  }

  public listenTo(): any {
    return WorkEntity;
  }

  public async beforeInsert(event: InsertEvent<WorkEntity>): Promise<void> {
    const workEntity = event.entity;
    const person = await this.workService.findPerson(workEntity.personId);
    workEntity.orderBy = person?.fullname;
  }
}