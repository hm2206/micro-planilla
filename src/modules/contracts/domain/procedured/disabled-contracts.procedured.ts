import {
  DatabaseProcedured,
  ParamProcedured
} from '../../../../database/database.procedured';

export class DisabledContractsProcedured extends DatabaseProcedured {
  constructor() {
    super();
  }

  public displayName: string = DisabledContractsProcedured.name;

  public params(): ParamProcedured[] {
      return []
  }

  public call(): Promise<any> {
    return super.call();
  }

  public query() {
    return (
      `
        UPDATE p_contracts as cont 
        SET cont.state = 0
        WHERE cont.terminationDate is not null
        AND cont.state = 1
        AND cont.terminationDate < 
        DATE(CONCAT(YEAR(NOW()), '-', MONTH(NOW()), '-01'));
      `
    )
  }
}