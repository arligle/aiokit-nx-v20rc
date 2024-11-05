import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app/app.module';
import { AppConfig } from './config/app.config';
import { Logger } from '@aionx/logger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
    //   genReqId: (req: { headers: { [x: string]: any } }) => {
    //   const requestId = req.headers[REQUEST_ID_HEADER];
    //   return requestId || generateRandomId();
    // },
    // bodyLimit: 10_485_760,
    }),
    { bufferLogs: true } // 设置为 true 时，日志消息将被暂时存储（缓冲），而不是立即输出。例如：避免在系统启动过程中产生过多的日志输出。
  );
  const config = app.get(AppConfig);
  const logger = app.get(Logger);
  app.useLogger(logger);
  const globalPrefix = config.prefix || 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = config.port || 3000;
  await app.listen({ port: port });
  logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
