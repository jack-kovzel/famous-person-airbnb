// A collection of custom/project-specific TypeScript utility types

/**
 * Removes `readonly` modifier from all the object's properties
 */
export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AbstractConstructor<T> = abstract new (...args: any[]) => T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<T> = new (...args: any[]) => T;

export type KeysWhereValueHasType<ObjectType, ValueType> = keyof {
  [Key in keyof ObjectType as ObjectType[Key] extends ValueType
    ? Key
    : never]: unknown;
};

/**
 * Any string that can safely be coerced into a Number
 */
export type NumericString = `${number}`;
