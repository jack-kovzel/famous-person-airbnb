import {
  DEFAULT_NUMBER_OF_RECORDS,
  MAX_NUMBER_OF_RECORDS,
} from '@app/consts/Pagination';

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
    description:
      'should throw an error when input value is greater than max possible value',
    inputValue: MAX_NUMBER_OF_RECORDS + 1,
    returnError: /paginationNumberOfRecords field cannot be greater than/,
  },
  {
    description: 'should create a valid paginationNumberOfRecords',
    inputValue: 1,
    returnError: null,
  },
  {
    description: 'should create a valid paginationNumberOfRecords',
    inputValue: DEFAULT_NUMBER_OF_RECORDS,
    returnError: null,
  },
  {
    description: 'should create a valid paginationNumberOfRecords',
    inputValue: MAX_NUMBER_OF_RECORDS,
    returnError: null,
  },
];
