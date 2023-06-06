import { Location } from '@app/dto/Location';
import { BoundingBoxArgs } from '@app/models/BoundingBoxArgs';

type CreateArgs = {
  readonly topLeft: Location;
  readonly bottomRight: Location;
};

export class BoundingBox {
  readonly topLeft: Location;

  readonly bottomRight: Location;

  constructor({ bottomRight, topLeft }: CreateArgs) {
    this.topLeft = topLeft;
    this.bottomRight = bottomRight;
  }

  static createFromArgs(args: BoundingBoxArgs | null): BoundingBox | null {
    if (args === null) {
      return null;
    }

    const { bottomRight, topLeft } = args;

    return new this({ bottomRight, topLeft });
  }
}
