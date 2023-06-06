import PaginatedResponse from '@app/models/pagination/PaginatedResponse';
import { PersonModel } from '@app/models/PersonModel';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginatedPersonsResponse extends PaginatedResponse(PersonModel) {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(readonly items: readonly PersonModel[], totalCount: number) {
    super(items, totalCount);
  }
}
