import { DomainError } from '@app/errors/DomainError';
import { isInt, isPositive } from 'class-validator';

export abstract class AbstractNaturalNumber {
  private readonly value: number;

  constructor(value: number) {
    if (!AbstractNaturalNumber.validate(value)) {
      throw new DomainError(`Value "${value}" is not a valid natural number.`);
    }

    this.value = value;
  }

  static validate(value: unknown): boolean {
    return isInt(value) && isPositive(value);
  }

  getValue(): number {
    return this.value;
  }
}
