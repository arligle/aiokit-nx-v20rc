import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// import { AppConfig } from './config/app.config';

export async function bootstrapBaseNestApp( module: any){
  const app = await NestFactory.create(module);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  //  const appConfig = app.get(AppConfig);
  await app.listen(9000);
  Logger.log(
    `🚀 Application is running on: http://localhost:/${globalPrefix}`
  );
}