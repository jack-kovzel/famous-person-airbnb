import { BoundingBoxArgs } from '@app/models/BoundingBoxArgs';
import { Field, InputType, ReturnTypeFuncValue } from '@nestjs/graphql';

@InputType()
export class GetPersonFilterByArgs {
  @Field((): ReturnTypeFuncValue => String, {
    nullable: true,
    defaultValue: null,
  })
  readonly searchString: string | null;

  @Field((): ReturnTypeFuncValue => BoundingBoxArgs, {
    nullable: true,
    defaultValue: null,
  })
  readonly location: BoundingBoxArgs | null;

  constructor(searchString: string | null, location: BoundingBoxArgs | null) {
    this.searchString = searchString;
    this.location = location;
  }
}
