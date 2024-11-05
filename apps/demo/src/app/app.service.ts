import { Injectable } from '@nestjs/common';
import { RootConfig, DatabaseConfig, TableConfig } from './../config';
import { LoggerConfig } from '@aionx/logger';

@Injectable()
export class AppService {
  // inject any config or sub-config you like
  constructor(
    private config: RootConfig,
    private databaseConfig: DatabaseConfig,
    private tableConfig: TableConfig,
    private loggerConfig: LoggerConfig,
  ) {}

  // enjoy type safety!
  public show(): any {
    const out = [
      `root.name: ${this.config.name}`,
      `root.database.name: ${this.databaseConfig.name}`,
      `root.database.table.name: ${this.tableConfig.name}`,
      `root.logger.colorize: ${this.config.logger.colorize}`,
    ].join('\n');

    return `${out}\n`;
  }
}
