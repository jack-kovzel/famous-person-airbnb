import { ConfigContainer } from '@app/config/ConfigContainer';
import { IndexName } from '@app/config/data/elasticsearch';
import { GetPersonFilterBy } from '@app/dto/GetPersonFilterBy';
import { PaginationResult } from '@app/dto/pagination/PaginationResult';
import {
  FamousPersonDocument,
  FamousPersonDocumentSource,
} from '@app/elasticsearch/documents/FamousPersonDocument';
import { AbstractDocumentRepositoryService } from '@app/elasticsearch/repository/AbstractDocumentRepositoryService';
import { DomainError } from '@app/errors/DomainError';
import { ElasticsearchService } from '@app/utils/elasticsearch/ElasticsearchService';
import { SearchHit } from '@elastic/elasticsearch/lib/api/types';
import { Injectable } from '@nestjs/common';
import { isNumber } from 'lodash';

type FindManyArgs = {
  readonly filterBy: GetPersonFilterBy | null;
  readonly paginationResult: PaginationResult;
};

@Injectable()
export class FamousPersonDocumentRepositoryService extends AbstractDocumentRepositoryService<FamousPersonDocument> {
  constructor(
    elasticsearchService: ElasticsearchService,
    private readonly config: ConfigContainer,
  ) {
    super(elasticsearchService, FamousPersonDocument);
  }

  async findMany({
    filterBy,
    paginationResult,
  }: FindManyArgs): Promise<[readonly FamousPersonDocument[], number]> {
    const results =
      await this.elasticsearchService.search<FamousPersonDocumentSource>({
        index: this.getIndexName(),
        from: paginationResult.offset,
        size: paginationResult.limit,
        body: {
          query: {
            bool: {
              ...(filterBy?.searchString
                ? {
                    minimum_should_match: 1,
                    should: [
                      {
                        match_phrase: {
                          short_description: {
                            query: filterBy.searchString,
                          },
                        },
                      },
                      {
                        match_phrase: {
                          name: {
                            query: filterBy.searchString,
                          },
                        },
                      },
                    ],
                  }
                : { must: { match_all: {} } }),
              ...(filterBy?.location
                ? {
                    filter: {
                      geo_bounding_box: {
                        'birth_place.location': {
                          top_left: filterBy.location.topLeft,
                          bottom_right: filterBy.location.bottomRight,
                        },
                      },
                    },
                  }
                : {}),
            },
          },
        },
      });

    const items = results.hits.hits.map(
      (hit: SearchHit<FamousPersonDocumentSource>): FamousPersonDocument => {
        if (hit._source === undefined) {
          throw new DomainError('Elasticsearch returned hit without _source');
        }

        return FamousPersonDocument.createFromSource(hit._id, hit._source);
      },
    );

    const totalCount = results.hits.total
      ? isNumber(results.hits.total)
        ? results.hits.total
        : results.hits.total.value
      : 0;

    return [items, totalCount];
  }

  protected getIndexName(): string {
    return this.config.elasticsearch.indexes[IndexName.FAMOUS_PERSON];
  }
}
