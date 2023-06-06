import { LocationArgs } from '@app/models/LocationArgs';
import { Field, InputType, ReturnTypeFuncValue } from '@nestjs/graphql';

@InputType()
export class BoundingBoxArgs {
  @Field((): ReturnTypeFuncValue => LocationArgs)
  readonly topLeft: LocationArgs;

  @Field((): ReturnTypeFuncValue => LocationArgs)
  readonly bottomRight: LocationArgs;

  constructor(topLeft: LocationArgs, bottomRight: LocationArgs) {
    this.topLeft = topLeft;
    this.bottomRight = bottomRight;
  }
}
