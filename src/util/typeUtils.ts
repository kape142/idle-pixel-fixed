export const keysOf = <T extends string, U>(record: Record<T, U>): T[] =>
  Object.keys(record).filter(key => record.hasOwnProperty(key)).map((record) => record as T);
