import { DEFAULT_NUMBER_OF_RECORDS } from '@app/consts/Pagination';
import { Pagination } from '@app/dto/pagination/Pagination';
import { PaginationResult } from '@app/dto/pagination/PaginationResult';
import { Injectable } from '@nestjs/common';

type CalculateArgs = {
  readonly pagination: Pagination | null;
  readonly defaultNumberOfRecords?: number;
};

@Injectable()
export class PaginationCalculatorService {
  async calculate({
    pagination,
    defaultNumberOfRecords = DEFAULT_NUMBER_OF_RECORDS,
  }: CalculateArgs): Promise<PaginationResult> {
    if (pagination === null) {
      return new PaginationResult({
        limit: defaultNumberOfRecords,
        offset: 0,
      });
    }

    return new PaginationResult({
      limit: pagination.numberOfRecords.getValue(),
      offset:
        (pagination.page.getValue() - 1) *
        pagination.numberOfRecords.getValue(),
    });
  }
}
