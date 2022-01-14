import { InternalServerErrorException } from "@nestjs/common";
import { ValidateChecked } from "src/common/utils/validate-checked";
import { ContractsService } from "src/modules/contracts/application/contracts.service";
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { InfoEntity } from "./info.entity";
import { AddConfigInfosProcedure } from "./procedured/add-config-infos.procedured";

@EventSubscriber()
export class InfoSubscriber implements EntitySubscriberInterface {
  constructor(
    private contractsService: ContractsService,
    private connection: Connection) {
    this.connection.subscribers.push(this);
  }

  public listenTo(): any {
    return InfoEntity;      
  }

  public async beforeInsert(event: InsertEvent<InfoEntity>): Promise<void> {
    const info = event.entity;
    await this.validateSave(info);
  }

  public async afterInsert(event: InsertEvent<InfoEntity>): Promise<void> {
    const info: InfoEntity = event.entity as any;
    // agregar configuración
    (new AddConfigInfosProcedure).call(info.id);
  }

  public async beforeUpdate(event: UpdateEvent<InfoEntity>): Promise<void> {
    const info: InfoEntity = event.entity as any;
    await this.validateSave(info, true);
  }

  private async validateSave(info: InfoEntity, edit = false) {
    info.isCheck = (new ValidateChecked(info.numberOfAccount)).compare(info.isCheck);
    // validar syncronización
    if (!edit) {
      const contract = await this.contractsService.findContract(info.contractId);
      if (info.isSync && !contract.state) throw new InternalServerErrorException();
    }
  }
}