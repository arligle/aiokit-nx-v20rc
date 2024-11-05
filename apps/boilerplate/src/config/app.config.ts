import { LoggerConfig } from '@aionx/logger';
import { Allow, IsInt, IsString, Max, Min } from 'class-validator';
// import { CorsConfig } from './cors.config';
// import { ValidateNestedProperty } from '@aionx/validation';

export class AppConfig {
  @IsInt()
  @Min(0)
  @Max(65_535)
  port!: number;

  @IsString()
  @Allow()
  prefix?: string;

  public readonly logger!: LoggerConfig;

  // @ValidateNestedProperty({ classType: CorsConfig })
  // public readonly cors!: CorsConfig;
}
