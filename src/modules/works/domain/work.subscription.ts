import { AuthHttpService } from "src/client-http/application/auth-http.service";
import { EventSubscriber, EntitySubscriberInterface, Connection, InsertEvent } from "typeorm";
import { WorkEntity } from "./work.entity";

@EventSubscriber()
export class WorkSubscription implements EntitySubscriberInterface<WorkEntity> {
  constructor(
    private authHttpService: AuthHttpService,
    private connection: Connection) {
    this.connection.subscribers.push(this);
  }

  public listenTo(): any {
    return WorkEntity;
  }

  public async beforeInsert(event: InsertEvent<WorkEntity>): Promise<void> {
    const workEntity = event.entity;
    const person = await this.authHttpService.findPerson(workEntity.personId);
    workEntity.orderBy = person?.fullname;
  }
}