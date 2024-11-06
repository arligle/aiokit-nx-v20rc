import { Controller, Get } from '@nestjs/common';
// import { FastifyRequest as Request } from 'fastify';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getData(@Req() req: Request) {
  //   // 获取请求req对象
  //   console.log(req);
  //   return this.appService.getData();
  // }
  @Get()
  getData() {
    return this.appService.getData();
  }
}
