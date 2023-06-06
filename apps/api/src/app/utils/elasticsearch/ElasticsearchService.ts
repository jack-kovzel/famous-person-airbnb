import { Client, ClientOptions } from '@elastic/elasticsearch';
import { Inject, Injectable } from '@nestjs/common';

export const ELASTICSEARCH_MODULE_OPTIONS = 'elasticsearch_module_options';

@Injectable()
export class ElasticsearchService extends Client {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @Inject(ELASTICSEARCH_MODULE_OPTIONS)
    options: ClientOptions,
  ) {
    super(options);
  }
}
