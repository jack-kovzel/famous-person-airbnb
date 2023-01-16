import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class FamousPersonModel {
  @Field()
  readonly id: string;

  constructor(
  ) {
    this.id = Math.random().toString();
  }
}
