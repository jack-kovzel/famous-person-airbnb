import { AbstractNaturalNumber } from '@app/value_objects/AbstractNaturalNumber';

export class PaginationPage extends AbstractNaturalNumber {
  // @ts-expect-error wanted error
  private paginationPage: undefined;
}
