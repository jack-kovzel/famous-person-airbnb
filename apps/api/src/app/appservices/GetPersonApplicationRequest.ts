import { GetPersonFilterBy } from '@app/dto/GetPersonFilterBy';
import { Pagination } from '@app/dto/pagination/Pagination';
import { GetPersonArgs } from '@app/models/GetPersonArgs';

type CreateArgs = {
  readonly filterBy: GetPersonFilterBy | null;
  readonly pagination: Pagination | null;
};

export class GetPersonApplicationRequest {
  readonly filterBy: GetPersonFilterBy | null;

  readonly pagination: Pagination | null;

  constructor({ filterBy, pagination }: CreateArgs) {
    this.filterBy = filterBy;
    this.pagination = pagination;
  }

  static createByArgs({
    filterBy,
    pagination,
  }: GetPersonArgs): GetPersonApplicationRequest {
    return new this({
      filterBy: GetPersonFilterBy.createFromArgs(filterBy),
      pagination: Pagination.createFromPaginationModel(pagination),
    });
  }
}
