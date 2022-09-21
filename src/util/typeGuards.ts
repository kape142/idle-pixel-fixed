export const isString = (string: unknown): string is string => typeof string === 'string';

export const isArray = (array: unknown): array is Array<unknown> => Array.isArray(array);

export const isObject = (object: unknown): object is Record<string, unknown> => typeof object === 'object';

export const isDate = (date: unknown): date is Date => date instanceof Date;

export const isNumber = (number: unknown): number is number => typeof number === 'number';
