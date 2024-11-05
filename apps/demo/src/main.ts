/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

// import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const globalPrefix = 'api';
  // app.setGlobalPrefix(globalPrefix);
  // const port = process.env.PORT || 3000;
  // await app.listen(port);
  // Logger.log(
  //   `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  // );
  const server = await app.listen(0);
  const port = server.address().port;
  console.log('Node.js 的当前工作目录:'+process.cwd());
  console.log('当前文件所在目录：'+__dirname);
  console.log(
    `\nApp successfully bootstrapped. You can try running:

    curl http://127.0.0.1:${port}`
  );
}

bootstrap().catch(console.error);
