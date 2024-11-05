import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RootConfig } from '../config';
import { Logger } from '@aionx/logger';
import { fileLoader, TypedConfigModule } from '@aionx/config';
// import { Logger } from 'nestjs-pino';

@Module({
  imports: [

    // setupLoggerModule(),
    TypedConfigModule.forRoot({
      schema: RootConfig,
      load: fileLoader(),
    }),
  ],
  controllers: [AppController],
  providers: [AppService,Logger],
})
export class AppModule {}
