import { IndexDocumentInterface } from '@app/elasticsearch/interfaces/IndexDocumentInterface';
import {
  assertIsNumber,
  assertIsObject,
  assertIsString,
  assertIsStringOrNull,
} from '@app/utils/TypeAsserter';
import { FamousPersonDocumentId } from '@app/value_objects/FamousPersonDocumentId';

export type FamousPersonDocumentSource = {
  readonly name: string;
  readonly birth_date: string;
  readonly death_date: string | null;
  readonly birth_place: {
    readonly place: string;
    readonly present_day_place: string | null;
    readonly location: {
      readonly lat: number;
      readonly lon: number;
    };
  };
  readonly page_text: string;
  readonly short_description: string;
  readonly image_url: string;
};

export type Location = {
  readonly lat: number;
  readonly lon: number;
};

export type BirthPlace = {
  readonly place: string;
  readonly presentDayPlace: string | null;
  readonly location: Location;
};

export type Markdown = string;

export type FamousPersonDocumentArgs = {
  readonly id: string;
  readonly name: string;
  readonly birthDate: Date;
  readonly deathDate: Date | null;
  readonly birthPlace: BirthPlace;
  readonly infoText: Markdown;
  readonly shortDescription: string;
  readonly imageUrl: string;
};

export type FamousPersonDocumentSourceJSON = Pick<
  FamousPersonDocumentSource,
  'name'
>;

export class FamousPersonDocument implements IndexDocumentInterface {
  readonly id: string;

  readonly name: string;

  readonly birthDate: Date;

  readonly deathDate: Date | null;

  readonly birthPlace: BirthPlace;

  readonly infoText: Markdown;

  readonly shortDescription: string;

  readonly imageUrl: string;

  constructor({
    id,
    name,
    birthDate,
    deathDate,
    birthPlace,
    infoText,
    imageUrl,
    shortDescription,
  }: FamousPersonDocumentArgs) {
    this.id = id;
    this.name = name;
    this.birthDate = birthDate;
    this.deathDate = deathDate;
    this.birthPlace = birthPlace;
    this.infoText = infoText;
    this.shortDescription = shortDescription;
    this.imageUrl = imageUrl;
  }

  getId(): FamousPersonDocumentId {
    return new FamousPersonDocumentId(this.id);
  }

  toJSON(): FamousPersonDocumentSourceJSON {
    return {
      name: this.name,
    };
  }

  static createFromSource(
    id: string,
    json: FamousPersonDocumentSource,
  ): FamousPersonDocument {
    const {
      name,
      birth_date: birthDate,
      death_date: deathDate,
      birth_place: birthPlace,
      page_text: infoText,
      image_url: imageUrl,
      short_description: shortDescription,
    } = json;

    assertIsString(id);
    assertIsString(name);
    assertIsString(birthDate);
    assertIsStringOrNull(deathDate);

    assertIsObject(birthPlace);
    assertIsString(birthPlace.place);
    assertIsStringOrNull(birthPlace.present_day_place);

    assertIsObject(birthPlace.location);
    assertIsNumber(birthPlace.location.lat);
    assertIsNumber(birthPlace.location.lon);

    assertIsString(infoText);

    assertIsString(shortDescription);
    assertIsString(imageUrl);

    return new FamousPersonDocument({
      id,
      name,
      birthDate: new Date(birthDate),
      deathDate: deathDate ? new Date(deathDate) : null,
      birthPlace: {
        location: birthPlace.location,
        place: birthPlace.place,
        presentDayPlace: birthPlace.present_day_place,
      },
      infoText,
      imageUrl,
      shortDescription,
    });
  }
}
