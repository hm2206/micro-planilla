import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { CronogramaEntity } from './cronograma.entity';
import ObjectId from 'bson-objectid';

@EventSubscriber()
export class CronogramaSubscriber implements EntitySubscriberInterface<CronogramaEntity> {
  constructor(private connection: Connection) {
    this.connection.subscribers.push(this);
  }

  public listenTo() {
    return CronogramaEntity;
  }

  public async beforeInsert(event: InsertEvent<CronogramaEntity>) {
    const token = new ObjectId().toHexString();
    const cronograma = event.entity;
    cronograma.token = token;
  }
}