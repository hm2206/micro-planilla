import { Connection, getConnection } from 'typeorm';

export enum paramModeProcedured {
  IN = "IN",
  OUT = "OUT",
  INOUT = 'INOUT'
}

export interface ParamProcedured {
  name: string,
  mode: paramModeProcedured,
  type: string,
  length?: any
}

interface BaseProcedured {
  displayName: string
  params(): ParamProcedured[]
  query(): string
  up(): void
  call(): any
}

export class DatabaseProcedured implements BaseProcedured {
  constructor(type = 'default') {
   this.connection = getConnection(type);
  }

  private connection: Connection;

  public displayName: string = DatabaseProcedured.name;

  public params(): ParamProcedured[] {
    return [];
  }

  public query() {
    return ``;
  }

  public async toSql() {
    const queryParams = [];
    await this.params().forEach(p => {
      queryParams.push(`${p.mode} ${p.name} ${p.type.toUpperCase()}${p.length ? `(${p.length})` : ''}`);
    });
    return `
      CREATE PROCEDURE ${this.displayName}(${queryParams.join(', ')})
      BEGIN
        ${this.query()}
      END;
    `
  }

  public async down() {
    await this.connection.query(`DROP PROCEDURE IF EXISTS \`${this.displayName}\`;`)
  }

  public async up() {
    const query = await this.toSql();
    await this.down();
    await this.connection.query(`${query}`);
  }

  public call(...args) {
    return this.connection.query(`CALL ${this.displayName}(${args.join(', ')})`);
  }

 }