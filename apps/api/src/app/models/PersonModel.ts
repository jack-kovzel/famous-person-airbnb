import { FamousPersonDocument } from '@app/elasticsearch/documents/FamousPersonDocument';
import { BirthPlaceModel } from '@app/models/BirthPlaceModel';
import { LocationModel } from '@app/models/LocationModel';
import { Field, ObjectType, ReturnTypeFuncValue } from '@nestjs/graphql';

type CreateArgs = {
  readonly id: string;
  readonly name: string;
  readonly birthDate: Date;
  readonly birthPlace: BirthPlaceModel;
  readonly deathDate: Date | null;
  readonly shortDescription: string;
  readonly imageUrl: string;
};

@ObjectType()
export class PersonModel {
  @Field()
  readonly id: string;

  @Field()
  readonly name: string;

  @Field()
  readonly birthDate: Date;

  @Field((): ReturnTypeFuncValue => BirthPlaceModel)
  readonly birthPlace: BirthPlaceModel;

  @Field((): ReturnTypeFuncValue => Date, { nullable: true })
  readonly deathDate: Date | null;

  @Field()
  readonly shortDescription: string;

  @Field()
  readonly imageUrl: string;

  constructor({
    id,
    name,
    birthDate,
    deathDate,
    shortDescription,
    birthPlace,
    imageUrl,
  }: CreateArgs) {
    this.id = id;
    this.name = name;
    this.birthDate = birthDate;
    this.deathDate = deathDate;
    this.shortDescription = shortDescription;
    this.birthPlace = birthPlace;
    this.imageUrl = imageUrl;
  }

  static createFromDocument({
    id,
    name,
    birthDate,
    deathDate,
    birthPlace,
    imageUrl,
    shortDescription,
  }: FamousPersonDocument): PersonModel {
    return new this({
      id,
      name,
      shortDescription,
      imageUrl,
      deathDate,
      birthDate,
      birthPlace: new BirthPlaceModel({
        place: birthPlace.place,
        presentDayPlace: birthPlace.presentDayPlace,
        location: new LocationModel(birthPlace.location),
      }),
    });
  }

  static createManyFromDocument(
    sources: readonly FamousPersonDocument[],
  ): PersonModel[] {
    return sources.map(
      (source: FamousPersonDocument): PersonModel =>
        this.createFromDocument(source),
    );
  }
}
