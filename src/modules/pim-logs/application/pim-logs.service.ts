import { Injectable } from "@nestjs/common";
import { PimLogRepository } from "../domain/pim-log.repository";

@Injectable()
export class PimLogsService {
  constructor(private pimLogRepository: PimLogRepository) { }

  public async isPimLogExecute(pimId: number): Promise<boolean> {
    const logs = await this.pimLogRepository.createQueryBuilder('l')
      .where(`l.pimId = ${pimId}`)
      .where(`l.isDefault = 0`)
      .getCount();
    return logs > 0;
  }
}