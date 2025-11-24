declare module "sql.js" {
  export interface QueryExecResult {
    columns: string[];
    values: any[][];
  }

  export class Database {
    constructor(data?: Uint8Array);
    exec(query: string): QueryExecResult[];
    run(query: string): void;
    close(): void;
  }

  export interface InitSqlJsConfig {
    locateFile?: (file: string) => string;
  }

  export default function initSqlJs(
    config?: InitSqlJsConfig
  ): Promise<{
    Database: typeof Database;
  }>;
}
