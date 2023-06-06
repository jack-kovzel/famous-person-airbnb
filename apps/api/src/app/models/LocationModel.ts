import { Field, ObjectType } from '@nestjs/graphql';

type CreateArgs = {
  readonly lat: number;
  readonly lon: number;
};

@ObjectType()
export class LocationModel {
  @Field()
  readonly lat: number;

  @Field()
  readonly lon: number;

  constructor({ lat, lon }: CreateArgs) {
    this.lat = lat;
    this.lon = lon;
  }
}
