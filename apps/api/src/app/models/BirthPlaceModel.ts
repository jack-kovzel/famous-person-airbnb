import { LocationModel } from '@app/models/LocationModel';
import { Field, ObjectType, ReturnTypeFuncValue } from '@nestjs/graphql';

type CreateArgs = {
  readonly place: string;
  readonly presentDayPlace: string | null;
  readonly location: LocationModel;
};

@ObjectType()
export class BirthPlaceModel {
  @Field()
  readonly place: string;

  @Field((): ReturnTypeFuncValue => String, { nullable: true })
  readonly presentDayPlace: string | null;

  @Field((): ReturnTypeFuncValue => LocationModel)
  readonly location: LocationModel;

  constructor({ location, place, presentDayPlace }: CreateArgs) {
    this.place = place;
    this.presentDayPlace = presentDayPlace;
    this.location = location;
  }
}
