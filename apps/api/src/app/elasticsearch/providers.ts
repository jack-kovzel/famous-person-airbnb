import { FamousPersonDocumentRepositoryService } from '@app/elasticsearch/repository/FamousPersonDocumentRepositoryService';
import { Provider } from '@nestjs/common';

const SERVICES: readonly Provider[] = [];

const REPOSITORIES: Provider[] = [FamousPersonDocumentRepositoryService];

const COMMANDS: Provider[] = [];

const ELASTICSEARCH_PROVIDERS: readonly Provider[] = [
  ...SERVICES,
  ...REPOSITORIES,
  ...COMMANDS,
];

export default ELASTICSEARCH_PROVIDERS;
