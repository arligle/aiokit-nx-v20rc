// import { LoggerConfig } from "@aionx/logger";
import { ValidateNestedProperty } from "@aionx/config";
import { AppConfig } from "./app.config";
import { LoggerConfig } from "@aionx/logger";

export default class RootConfig {
  @ValidateNestedProperty({ classType: AppConfig })
  public readonly app!: AppConfig;

  @ValidateNestedProperty({ classType: LoggerConfig })
  public readonly logger!: LoggerConfig;
}
