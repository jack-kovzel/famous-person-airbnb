import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LocationArgs {
  @Field()
  readonly lat: number;

  @Field()
  readonly lon: number;

  constructor(lat: number, lon: number) {
    this.lat = lat;
    this.lon = lon;
  }
}
