import { PimLogsService } from "../../../modules/pim-logs/application/pim-logs.service";
import { EventSubscriber, EntitySubscriberInterface, Connection, InsertEvent, UpdateEvent } from "typeorm";
import { PimEntity } from "./pim.entity";
import { InternalServerErrorException } from "@nestjs/common";
import { PimRepository } from "./pim.repository";

@EventSubscriber()
export class PimSubscriber implements EntitySubscriberInterface<PimEntity> {
  constructor(
    private connection: Connection,
    private pimLogsService: PimLogsService,
    private pimRepository: PimRepository) {
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

  public async beforeUpdate(event: UpdateEvent<PimEntity>): Promise<void> {
    const pimEntity: PimEntity = event.entity as any;
    const currentPim = await this.pimRepository.findOneOrFail(pimEntity.id);
    if (currentPim.amount == pimEntity.amount) return;
    // validar modificación del amonto
    const isLogs = await this.pimLogsService
      .isPimLogExecute(pimEntity.id);
    if (isLogs) throw new InternalServerErrorException(`
      No se puede modificar el monto
    `);
  }
}