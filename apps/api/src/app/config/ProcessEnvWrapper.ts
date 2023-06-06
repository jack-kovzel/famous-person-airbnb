import ReadOnlyDict = NodeJS.ReadOnlyDict;

export class ProcessEnvWrapper {
  constructor(private readonly env: ReadOnlyDict<string>) {}

  startWith(startString: string): string[] {
    return Object.keys(this.env).filter((key: string): boolean =>
      key.startsWith(startString),
    );
  }

  string(parameterName: string): string {
    return this.getValue(parameterName);
  }

  stringOrDefault(parameterName: string, defaultValue: string): string {
    const value = this.env[parameterName];

    if (value === undefined) {
      return defaultValue;
    }

    return value;
  }

  stringOrNull(parameterName: string): string | null {
    return this.env[parameterName] ?? null;
  }

  int(parameterName: string): number {
    const parsedValue = parseInt(this.getValue(parameterName), 10);

    if (Number.isNaN(parsedValue)) {
      throw new Error(`${parameterName} value is not a valid int`);
    }

    return parsedValue;
  }

  intOrDefault(parameterName: string, defaultValue: number): number {
    const value = this.env[parameterName];

    if (value === undefined) {
      return defaultValue;
    }

    const parsedValue = parseInt(this.getValue(parameterName), 10);

    if (Number.isNaN(parsedValue)) {
      throw new Error(`${parameterName} value is not a valid int`);
    }

    return parsedValue;
  }

  float(parameterName: string): number {
    const parsedValue = parseFloat(this.getValue(parameterName));

    if (Number.isNaN(parsedValue)) {
      throw new Error(`${parameterName} value is not a valid float`);
    }

    return parsedValue;
  }

  bool(parameterName: string): boolean {
    const value = this.getValue(parameterName).toLowerCase();

    if (value === 'true' || value === '1') {
      return true;
    }

    if (value === 'false' || value === '0') {
      return false;
    }

    throw new Error(`${parameterName} value is not a valid bool`);
  }

  boolOrDefault(parameterName: string, defaultValue: boolean): boolean {
    const value = this.env[parameterName];

    if (value === undefined) {
      return defaultValue;
    }

    if (value === 'true' || value === '1') {
      return true;
    }

    if (value === 'false' || value === '0') {
      return false;
    }

    throw new Error(`${parameterName} value is not a valid bool`);
  }

  /**
   * @throws {Error}
   */
  private getValue(parameterName: string): string {
    const valueOrUndefined = this.env[parameterName];

    if (valueOrUndefined === undefined) {
      throw new Error(`${parameterName} env parameter is missing`);
    }

    return valueOrUndefined;
  }
}
