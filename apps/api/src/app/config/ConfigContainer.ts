import ElasticsearchConfig from '@app/config/data/elasticsearch';
import { EnvironmentVariables } from '@app/config/EnvironmentVariables';

export class ConfigContainer {
  readonly elasticsearch: ElasticsearchConfig;

  constructor(env: EnvironmentVariables) {
    this.elasticsearch = new ElasticsearchConfig(env);
  }
}
