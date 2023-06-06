import { PaginationModel } from '@app/models/pagination/PaginationModel';
import { PaginationNumberOfRecords } from '@app/value_objects/pagination/PaginationNumberOfRecords';
import { PaginationPage } from '@app/value_objects/pagination/PaginationPage';

type PaginationArgs = {
  readonly page: PaginationPage;
  readonly numberOfRecords: PaginationNumberOfRecords;
};

export class Pagination {
  readonly page: PaginationPage;

  readonly numberOfRecords: PaginationNumberOfRecords;

  constructor({ page, numberOfRecords }: PaginationArgs) {
    this.page = page;
    this.numberOfRecords = numberOfRecords;
  }

  static createFromPaginationModel(
    paginationModel: PaginationModel | null,
  ): Pagination | null {
    if (paginationModel === null) {
      return null;
    }

    return new this({
      page: new PaginationPage(paginationModel.page),
      numberOfRecords: new PaginationNumberOfRecords(
        paginationModel.numberOfRecords,
      ),
    });
  }
}
