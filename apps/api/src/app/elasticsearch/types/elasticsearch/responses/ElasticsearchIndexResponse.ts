export type ElasticsearchIndexResult = 'created' | 'updated';

export type ElasticsearchIndexResponse = {
  readonly _id: string;
  readonly result: ElasticsearchIndexResult;
};
