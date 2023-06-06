import { MAX_NUMBER_OF_RECORDS } from '@app/consts/Pagination';
import { DomainError } from '@app/errors/DomainError';
import { AbstractNaturalNumber } from '@app/value_objects/AbstractNaturalNumber';

export class PaginationNumberOfRecords extends AbstractNaturalNumber {
  constructor(value: number) {
    if (value > MAX_NUMBER_OF_RECORDS) {
      throw new DomainError(
        `paginationNumberOfRecords field cannot be greater than ${MAX_NUMBER_OF_RECORDS}`,
      );
    }

    super(value);
  }
}
