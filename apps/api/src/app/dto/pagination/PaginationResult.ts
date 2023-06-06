type PaginationResultArgs = {
  readonly limit: number;
  readonly offset: number;
};

export class PaginationResult {
  readonly limit: number;

  readonly offset: number;

  constructor({ limit, offset }: PaginationResultArgs) {
    this.limit = limit;
    this.offset = offset;
  }
}
