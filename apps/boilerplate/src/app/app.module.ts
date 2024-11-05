import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfig } from '../config/app.config';
import { setupYamlBaseConfigModule } from '@aionx/config';
import { LoggerModule } from '@aionx/logger';

@Module({
  imports: [
    LoggerModule.forRoot(),
    setupYamlBaseConfigModule(__dirname, AppConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
