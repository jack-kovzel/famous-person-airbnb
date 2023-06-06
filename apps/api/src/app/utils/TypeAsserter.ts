import { NumericString } from '@app/utils/UtilityTypes';
import { isNegative, isPositive } from 'class-validator';
import { isBoolean, isNumber, isObject, isString } from 'lodash';

export function assertIsObject(
  value: unknown,
): asserts value is Record<string, unknown> {
  if (!isObject(value)) {
    throw new Error(`Expected an object, found: ${value}`);
  }
}

export function assertIsArray(value: unknown): asserts value is unknown[] {
  if (!Array.isArray(value)) {
    throw new Error(`Expected an array, found: ${value}`);
  }
}

export function assertIsString(value: unknown): asserts value is string {
  if (!isString(value)) {
    throw new Error(`Expected a string, found: ${value}`);
  }
}

export function assertIsStringOrNumber(
  value: unknown,
): asserts value is string | number {
  if (!isString(value) && !isNumber(value)) {
    throw new Error(`Expected a string or a number, found: ${value}`);
  }
}

export function assertIsStringOrNull(
  value: unknown,
): asserts value is string | null {
  if (value === null) {
    return;
  }

  try {
    assertIsString(value);
  } catch (e: unknown) {
    throw new Error(`Expected a string or null, found: ${value}`);
  }
}

export function assertIsArrayOfStrings(
  value: unknown,
): asserts value is string[] {
  assertIsArray(value);
  value.forEach((item: unknown): asserts item is string => {
    assertIsString(item);
  });
}

export function assertIsArrayOfStringsOrNull(
  value: unknown,
): asserts value is string[] | null {
  if (value === null) {
    return;
  }

  try {
    assertIsArrayOfStrings(value);
  } catch (e: unknown) {
    throw new Error(`Expected an array of strings or null, found: ${value}`);
  }
}

export function assertIsNumber(value: unknown): asserts value is number {
  if (
    (typeof value !== 'number' && !(value instanceof Number)) ||
    isNaN(value.valueOf())
  ) {
    throw new Error(`Expected a number, found: ${value}`);
  }
}

export function assertIsNumberOrNull(
  value: unknown,
): asserts value is number | null {
  if (value === null) {
    return;
  }

  try {
    assertIsNumber(value);
  } catch (e: unknown) {
    throw new Error(`Expected a number or null, found: ${value}`);
  }
}

export function assertIsNumericString(
  value: unknown,
): asserts value is NumericString {
  try {
    assertIsString(value);

    if (value.trim() === '') {
      throw new Error();
    }
    assertIsNumber(Number(value));
  } catch (e: unknown) {
    throw new Error(`Expected a numeric string, found: ${value}`);
  }
}

export function assertIsBoolean(value: unknown): asserts value is boolean {
  if (!isBoolean(value)) {
    throw new Error(`Expected a boolean, found: ${value}`);
  }
}

export function isStringEnumValue<StringEnum extends Record<string, string>>(
  value: unknown,
  stringEnum: StringEnum,
): value is StringEnum[keyof StringEnum] {
  return isString(value) && Object.values(stringEnum).includes(value);
}

export function assertIsStringEnumValue<
  StringEnum extends Record<string, string>,
>(
  value: unknown,
  stringEnum: StringEnum,
): asserts value is StringEnum[keyof StringEnum] {
  if (isStringEnumValue(value, stringEnum) === false) {
    throw new Error(
      `Expected a value from {${Object.values(stringEnum).join(
        ', ',
      )}}, found: ${value}`,
    );
  }
}

export function assertIsPositiveNumber(
  value: unknown,
): asserts value is unknown[] {
  assertIsNumber(value);

  if (isPositive(value) === false) {
    throw new Error(`Expected a positive number, found: ${value}`);
  }
}

export function assertIsNegativeNumber(
  value: unknown,
): asserts value is unknown[] {
  assertIsNumber(value);

  if (isNegative(value) === false) {
    throw new Error(`Expected a negative number, found: ${value}`);
  }
}
