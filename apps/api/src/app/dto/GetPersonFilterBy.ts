import { BoundingBox } from '@app/dto/BoundingBox';
import { GetPersonFilterByArgs } from '@app/models/GetPersonFilterByArgs';

type CreateArgs = {
  readonly searchString: string | null;
  readonly location: BoundingBox | null;
};

export class GetPersonFilterBy {
  readonly searchString: string | null;

  readonly location: BoundingBox | null;

  constructor({ searchString, location }: CreateArgs) {
    this.searchString = searchString;
    this.location = location;
  }

  static createFromArgs(
    args: GetPersonFilterByArgs | null,
  ): GetPersonFilterBy | null {
    if (args === null) {
      return null;
    }

    const { searchString, location } = args;

    return new this({
      searchString,
      location: BoundingBox.createFromArgs(location),
    });
  }
}
