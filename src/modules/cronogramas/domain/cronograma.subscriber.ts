import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { CronogramaEntity } from './cronograma.entity';
import ObjectId from 'bson-objectid';
import { PlanillasService } from 'src/modules/planillas/application/planillas.service';

@EventSubscriber()
export class CronogramaSubscriber implements EntitySubscriberInterface<CronogramaEntity> {
  constructor(
    private connection: Connection,
    private planillasService: PlanillasService
  ) {
    this.connection.subscribers.push(this);
  }

  public listenTo() {
    return CronogramaEntity;
  }

  public async beforeInsert(event: InsertEvent<CronogramaEntity>) {
    const token = new ObjectId().toHexString();
    const cronograma = event.entity;
    const planilla = await this.planillasService.findOrFail(cronograma.planillaId);
    cronograma.token = token;
    cronograma.descripcion = planilla.description;
    cronograma.createdAt = new Date;
  }
}