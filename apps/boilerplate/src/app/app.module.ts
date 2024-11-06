import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { setupYamlBaseConfigModule } from '@aionx/config';
import { Logger, setupLoggerModule } from '@aionx/logger';
import rootConfig from '../config/root.config';

@Module({
  imports: [
    setupLoggerModule(),
    setupYamlBaseConfigModule(__dirname, rootConfig),
  ],
  controllers: [AppController],
  providers: [AppService,Logger],
})
export class AppModule {}
