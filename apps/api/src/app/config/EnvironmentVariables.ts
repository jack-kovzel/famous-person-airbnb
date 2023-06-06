import { ProcessEnvWrapper } from '@app/config/ProcessEnvWrapper';
import { IsNotEmpty, IsString, IsUrl, validateSync } from 'class-validator';

export class EnvironmentVariables {
  @IsUrl({ require_tld: false })
  ELASTICSEARCH_NODE_URL: string;

  @IsString()
  @IsNotEmpty()
  ELASTICSEARCH_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  ELASTICSEARCH_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  ELASTICSEARCH_INDEX_FAMOUS_PERSONS: string;

  constructor(wrappedEnv: ProcessEnvWrapper) {
    this.ELASTICSEARCH_NODE_URL = wrappedEnv.string('ELASTICSEARCH_NODE_URL');
    this.ELASTICSEARCH_USERNAME = wrappedEnv.string('ELASTICSEARCH_USERNAME');
    this.ELASTICSEARCH_PASSWORD = wrappedEnv.string('ELASTICSEARCH_PASSWORD');

    this.ELASTICSEARCH_INDEX_FAMOUS_PERSONS = wrappedEnv.string(
      'ELASTICSEARCH_INDEX_FAMOUS_PERSONS',
    );

    this.validate();
  }

  private validate(): void {
    const errors = validateSync(this, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new Error(errors.join('\n'));
    }
  }
}
