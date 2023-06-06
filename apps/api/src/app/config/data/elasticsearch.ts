import { EnvironmentVariables } from '@app/config/EnvironmentVariables';
import { trimEnd } from 'lodash';

export enum IndexName {
  FAMOUS_PERSON = 'FAMOUS_PERSON',
}

export default class ElasticsearchConfig {
  readonly nodeUrl: string;

  readonly username: string;

  readonly password: string;

  readonly indexes: {
    [IndexName.FAMOUS_PERSON]: string;
  };

  constructor(env: EnvironmentVariables) {
    this.nodeUrl = trimEnd(env.ELASTICSEARCH_NODE_URL, '/');
    this.username = env.ELASTICSEARCH_USERNAME;
    this.password = env.ELASTICSEARCH_PASSWORD;

    this.indexes = {
      [IndexName.FAMOUS_PERSON]: env.ELASTICSEARCH_INDEX_FAMOUS_PERSONS,
    };
  }
}
