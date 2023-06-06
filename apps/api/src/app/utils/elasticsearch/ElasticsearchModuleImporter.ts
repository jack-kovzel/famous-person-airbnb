import { ConfigContainer } from '@app/config/ConfigContainer';
import {
  ELASTICSEARCH_MODULE_OPTIONS,
  ElasticsearchService,
} from '@app/utils/elasticsearch/ElasticsearchService';
import { ClientOptions as ElasticsearchModuleOptions } from '@elastic/elasticsearch';
import { DynamicModule, Module } from '@nestjs/common';

/*
 * This was created instead of vendor-provided ElasticsearchModule to make
 * ElasticsearchService available globally without having to re-import the
 * vendor module inside each of modules within our codebase. Despite we've
 * deprecated the usage of modules in out code, there's still a chance
 * some old code would need to access the ElasticsearchService.
 */
@Module({
  providers: [ElasticsearchService],
  exports: [ElasticsearchService],
})
class ElasticsearchModule {
  static forRoot(): DynamicModule {
    return {
      module: ElasticsearchModule,
      global: true,
      providers: [
        {
          provide: ELASTICSEARCH_MODULE_OPTIONS,
          useFactory: (
            config: ConfigContainer,
          ): ElasticsearchModuleOptions => ({
            auth: {
              username: config.elasticsearch.username,
              password: config.elasticsearch.password,
            },
            node: config.elasticsearch.nodeUrl,
            sniffOnStart: true,
            sniffInterval: 300,
          }),
          inject: [ConfigContainer],
        },
      ],
      exports: [],
    };
  }
}

export const ElasticsearchModuleImporter = ElasticsearchModule.forRoot();
