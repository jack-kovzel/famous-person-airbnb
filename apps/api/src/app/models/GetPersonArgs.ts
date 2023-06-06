import { GetPersonFilterByArgs } from '@app/models/GetPersonFilterByArgs';
import { PaginationModel } from '@app/models/pagination/PaginationModel';
import { ArgsType, Field, ReturnTypeFuncValue } from '@nestjs/graphql';

@ArgsType()
export class GetPersonArgs {
  @Field((): ReturnTypeFuncValue => GetPersonFilterByArgs, {
    nullable: true,
    defaultValue: null,
  })
  readonly filterBy: GetPersonFilterByArgs | null;

  @Field((): ReturnTypeFuncValue => PaginationModel, {
    nullable: true,
    defaultValue: null,
  })
  readonly pagination: PaginationModel | null;

  constructor(
    filterBy: GetPersonFilterByArgs | null,
    pagination: PaginationModel | null,
  ) {
    this.filterBy = filterBy;
    this.pagination = pagination;
  }
}
