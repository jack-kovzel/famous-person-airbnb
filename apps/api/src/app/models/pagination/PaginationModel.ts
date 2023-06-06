import {
  DEFAULT_NUMBER_OF_RECORDS,
  MAX_NUMBER_OF_RECORDS,
} from '@app/consts/Pagination';
import { Field, InputType, Int, ReturnTypeFuncValue } from '@nestjs/graphql';

@InputType()
export class PaginationModel {
  @Field((): ReturnTypeFuncValue => Int)
  readonly page: number;

  @Field((): ReturnTypeFuncValue => Int, {
    description: `Min: 1, Max: ${MAX_NUMBER_OF_RECORDS}, Default: ${DEFAULT_NUMBER_OF_RECORDS}`,
  })
  readonly numberOfRecords: number;

  constructor(page: number, numberOfRecords: number) {
    this.page = page;
    this.numberOfRecords = numberOfRecords;
  }
}
