export const reduceToRecord = <T>(
  list: string[],
  mappers: ((value: string) => Partial<T>)[],
) =>
  list
    .reduce<Partial<T>[]>((acc, cur, j) => {
      const i = Math.floor(j / mappers.length);
      if (!acc[i]) acc[i] = {};
      mappers.forEach((mapper, index) => {
        if (j % mappers.length === index) {
          Object.assign(acc[i], mapper(cur));
        }
      });
      return acc;
    }, [])
    .map((t) => t as T);
