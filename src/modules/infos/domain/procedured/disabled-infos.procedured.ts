import {
  DatabaseProcedured,
  ParamProcedured
} from '../../../../database/database.procedured';

export class DisabledInfosProcedured extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = DisabledInfosProcedured.name;

  public params(): ParamProcedured[] {
      return []
  }

  public call(): Promise<any> {
    return super.call();
  }

  public query() {
    return (
      `
        UPDATE p_infos as inf
        INNER JOIN p_contracts as cont 
        ON cont.id = inf.contractId
        SET inf.state = 0
        WHERE inf.state = 1
        AND cont.state = 0
        AND inf.isSync = 1;
      `
    )
  }
}