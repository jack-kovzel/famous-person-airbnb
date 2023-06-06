import { IndexDocumentInterface } from '@app/elasticsearch/interfaces/IndexDocumentInterface';
import { IndexDocumentType } from '@app/elasticsearch/interfaces/IndexDocumentType';
import { ElasticsearchDeleteResponse } from '@app/elasticsearch/types/elasticsearch/responses/ElasticsearchDeleteResponse';
import { ElasticsearchIndexResponse } from '@app/elasticsearch/types/elasticsearch/responses/ElasticsearchIndexResponse';
import { DomainError } from '@app/errors/DomainError';
import { IdType } from '@app/types/IdType';
import { ElasticsearchService } from '@app/utils/elasticsearch/ElasticsearchService';
import { first } from 'lodash';

export abstract class AbstractDocumentRepositoryService<
  IndexDocument extends IndexDocumentInterface,
> {
  protected constructor(
    protected readonly elasticsearchService: ElasticsearchService,
    protected readonly documentType: IndexDocumentType<IndexDocument>,
  ) {}

  async findOneById(id: IdType<IndexDocument>): Promise<IndexDocument | null> {
    const response = await this.elasticsearchService.search<
      Record<string, unknown>
    >({
      index: this.getIndexName(),
      body: {
        query: {
          ids: {
            values: [id.toString()],
          },
        },
      },
    });

    const result = first(response.hits.hits);

    if (result !== undefined && result._source !== undefined) {
      return this.documentType.createFromSource(result._id, result._source);
    }

    return null;
  }

  async getOneById(id: IdType<IndexDocument>): Promise<IndexDocument> {
    const result = await this.findOneById(id);

    if (result === null) {
      throw new DomainError(
        `Cannot find index document matching #${id.toString()}`,
      );
    }

    return result;
  }

  async save(document: IndexDocument): Promise<ElasticsearchIndexResponse> {
    const response = await this.elasticsearchService.index({
      id: document.getId().toString(),
      index: this.getIndexName(),
      body: document.toJSON(),
    });

    if (response.result !== 'created' && response.result !== 'updated') {
      throw new DomainError(
        `Unexpected save response result: ${response.result}`,
      );
    }

    return {
      _id: response._id,
      result: response.result,
    };
  }

  async delete(document: IndexDocument): Promise<ElasticsearchDeleteResponse> {
    const response = await this.elasticsearchService.delete({
      id: document.getId().toString(),
      index: this.getIndexName(),
    });

    if (response.result !== 'deleted') {
      throw new DomainError(
        `Unexpected delete response result: ${response.result}`,
      );
    }

    return {
      result: 'deleted',
    };
  }

  protected abstract getIndexName(): string;
}
