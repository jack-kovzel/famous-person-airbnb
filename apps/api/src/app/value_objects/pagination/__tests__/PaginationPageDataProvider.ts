export type TestCase = {
  description: string;
  inputValue: number;
  returnError: RegExp | null;
};

export const TEST_CASES: TestCase[] = [
  {
    description: 'should throw an error when input value is not an integer',
    inputValue: 2.5,
    returnError: /is not a valid natural number/,
  },
  {
    description: 'should throw an error when input value is negative',
    inputValue: -1,
    returnError: /is not a valid natural number/,
  },
  {
    description: 'should throw an error when input value is 0',
    inputValue: 0,
    returnError: /is not a valid natural number/,
  },
  {
    description: 'should create a valid paginationPage',
    inputValue: 1,
    returnError: null,
  },
  {
    description: 'should create a valid paginationPage',
    inputValue: 10,
    returnError: null,
  },
];
