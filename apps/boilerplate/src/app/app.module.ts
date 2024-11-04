import { Module } from '@nestjs/common';
// import { TypedConfigModule, fileLoader } from 'nest-typed-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfig } from '../config/app.config';
import { setupYamlBaseConfigModule } from '@aionx/config';

@Module({
  imports: [
    setupYamlBaseConfigModule(__dirname, AppConfig),
    // TypedConfigModule.forRoot({
    //   schema: AppConfig,
    //   load: fileLoader({
    //     // absolutePath: '.env.yaml', // 需要重新配置
    //     absolutePath: 'assets/.env.yaml',
    //     ignoreEnvironmentVariableSubstitution: false,
    //     ignoreEmptySearchPlaces: false,
    //   }),
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
