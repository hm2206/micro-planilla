import { ValidateChecked } from "src/common/utils/validate-checked";
import { Connection, EntitySubscriberInterface, EventSubscriber, UpdateEvent } from "typeorm";
import { HistorialEntity } from "./historial.entity";

@EventSubscriber()
export class HistorialSubscriber implements EntitySubscriberInterface<HistorialEntity> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  public listenTo(): any{
    return HistorialEntity;
  }

  public beforeUpdate(event: UpdateEvent<HistorialEntity>): void | Promise<any> {
    const history: HistorialEntity = event.entity as any;
    history.isCheck = (new ValidateChecked(history.numberOfAccount))
      .compare(history.isCheck);
  }
}