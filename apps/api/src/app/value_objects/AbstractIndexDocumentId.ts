import { DomainError } from '@app/errors/DomainError';
import { isNotEmpty, isString } from 'class-validator';

// This was separated from AbstractId since for index documents id would not
// be always a UUID. Sometimes it's more convenient to use e.g. code or a slug
// as an id so the reindex logic would be simpler.
export abstract class AbstractIndexDocumentId {
  private readonly value: string;

  constructor(value: string) {
    if (!this.validate(value)) {
      throw new DomainError(
        `Value "${value}" is not a valid ${this.constructor.name}.`,
      );
    }

    this.value = value;
  }

  toString(): string {
    return this.value;
  }

  /**
   * Also checks type at runtime for added safety
   */
  equals(other: this): boolean {
    return (
      this.constructor === other.constructor && this.value === other.toString()
    );
  }

  protected validate(value: unknown): boolean {
    return isNotEmpty(value) && isString(value);
  }

  static createFromValue<T extends AbstractIndexDocumentId>(
    this: {
      new (value: string): T;
    },
    fromValue: T | string,
  ): T {
    return new this(fromValue.toString());
  }

  static createManyFromString<T extends AbstractIndexDocumentId>(
    this: {
      new (value: string): T;
    },
    fromValues: readonly string[],
  ): readonly T[] {
    return fromValues.map(
      (fromValue: string): T => new this(fromValue.toString()),
    );
  }
}
