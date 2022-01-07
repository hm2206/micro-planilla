import { EventSubscriber, EntitySubscriberInterface, Connection, InsertEvent, UpdateEvent } from "typeorm";
import { ContractEntity } from "./contract.entity";
import { ContractsService } from "../application/contracts.service";
import { WorksService } from "../../works/application/works.service";

@EventSubscriber()
export class ContractSubscriber implements EntitySubscriberInterface<ContractEntity> {
  constructor(
    private worksService: WorksService,
    private contractsService: ContractsService,
    private connection: Connection) {
    this.connection.subscribers.push(this);
  }

  public listenTo(): any {
    return ContractEntity;
  }

  public async afterInsert(event: InsertEvent<ContractEntity>): Promise<void> {
    const contractEntity = event.entity;
    if (!contractEntity.state) return;
    this.worksService.editState(contractEntity.workId, true);
  }

  public async afterUpdate(event: UpdateEvent<ContractEntity>): Promise<void> {
    const contractEntity = event.entity;
    const count = await this.contractsService
      .countContract({ workId: contractEntity.workId });
    console.log(count);
  }
}