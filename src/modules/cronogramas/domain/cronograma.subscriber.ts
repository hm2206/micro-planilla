import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { CronogramaEntity } from './cronograma.entity';
import ObjectId from 'bson-objectid';
import { DateTime } from 'luxon';

@EventSubscriber()
export class CronogramaSubscriber implements EntitySubscriberInterface<CronogramaEntity> {
  constructor(private connection: Connection) {
    this.connection.subscribers.push(this);
  }

  public listenTo() {
    return CronogramaEntity;
  }

  public async beforeInsert(event: InsertEvent<CronogramaEntity>) {
    const cronograma = event.entity;
    const token = new ObjectId().toHexString();
    const currentDate = DateTime.local(cronograma.year, cronograma.month);
    // setting cronogramas
    cronograma.token = token;
    cronograma.numberOfDays = currentDate.daysInMonth;
  }
}