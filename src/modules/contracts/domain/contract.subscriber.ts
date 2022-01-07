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
    const contract = event.entity;
    if (!contract.state) return;
    this.worksService.editState(contract.workId, true);
  }

  public async afterUpdate(event: UpdateEvent<ContractEntity>): Promise<void> {
    const contract: ContractEntity = event.entity as any;
    // activar work
    if (contract.state) {
      this.worksService.editState(contract.workId, true);
      return;
    }
    // verificar si tiene contratos activos
    const count = await this.contractsService
      .countContract({
        workId: contract.workId,
        state: true
      });
    // disabled work
    const isDisabled = (count - 1) <= 0;
    if (isDisabled) this.worksService.editState(contract.workId, false);
  }
}