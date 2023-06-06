type CreateArgs = {
  readonly lat: number;
  readonly lon: number;
};

export class Location {
  readonly lat: number;

  readonly lon: number;

  constructor({ lat, lon }: CreateArgs) {
    this.lat = lat;
    this.lon = lon;
  }
}
