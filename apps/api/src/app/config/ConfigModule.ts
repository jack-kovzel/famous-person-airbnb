import { CUSTOM_CONFIG_PROVIDERS } from '@app/config/configProvider';
import { DynamicModule, Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: CUSTOM_CONFIG_PROVIDERS,
  exports: CUSTOM_CONFIG_PROVIDERS,
})
export class ConfigModule {
  static forRoot(): DynamicModule {
    return {
      module: ConfigModule,
      global: true,
      providers: CUSTOM_CONFIG_PROVIDERS,
      exports: CUSTOM_CONFIG_PROVIDERS,
    };
  }
}
