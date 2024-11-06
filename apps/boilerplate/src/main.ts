import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app/app.module';
import { AppConfig } from './config/app.config';
import { Logger } from '@aionx/logger';
import { generateRandomId } from './utils/crypto';
import { FastifyInstance } from 'fastify';
import fastifyHelmet from '@fastify/helmet';
import { applyExpressCompatibility } from './bootstrap/fastify-setup';

const REQUEST_ID_HEADER = 'x-request-id';

async function bootstrap() {
  // TODO: 创建应用
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      // 给每一个请求分配一个ID，用于追踪请求：
      // 1、如果请求已经有了'x-request-id'
      // 2、否则生成一个随机ID
      genReqId: (req: { headers: { [x: string]: any } }) => {
      const requestId = req.headers[REQUEST_ID_HEADER];
      return requestId || generateRandomId();
    },
    bodyLimit: 10_485_760,
    }),

    // 设置为 true 时，日志消息将被暂时存储（缓冲）而不是立即输出。
    { bufferLogs: true }
  );

  // 直接访问和操作 Fastify 实例，利用 Fastify 提供的各种功能和插件来扩展和定制你的 NestJS 应用程序。
  const fastifyInstance: FastifyInstance = app.getHttpAdapter().getInstance();
  // 提高 Fastify 与 Express 的兼容性
  applyExpressCompatibility(fastifyInstance);

  // TODO: 初始化应用
  const config = app.get(AppConfig);

  const logger = app.get(Logger);
  app.useLogger(logger);
   app.flushLogs(); // 刷新日志：将内存中的日志数据写入到持久存储（如文件或数据库）中

  const globalPrefix = config.prefix || 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = config.port || 3000;

  // TODO: 其他设置
  // 启用跨域请求
  // app.enableCors(config.cors);

  // 启用应用程序的关闭钩子。在应用程序关闭时执行必要的清理操作，从而提高应用程序的可靠性和稳定性。
  app.enableShutdownHooks();
  // 在 Fastify 应用实例上注册了fastify-helmet 插件，并传递了一个空对象作为配置选项。
  // fastify-helmet 是一个用于增强 HTTP 头安全性的插件。
  // 它基于 Helmet.js，为 Fastify 提供了一组中间件，用于设置各种 HTTP 头，
  // 以帮助保护应用免受一些常见的 Web 安全漏洞的攻击，例如跨站脚本（XSS）攻击和点击劫持。
  app.register(fastifyHelmet, {});


  // TODO: 启动应用
  await app.listen({ port: port });
  logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
