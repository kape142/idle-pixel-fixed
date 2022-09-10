export const removeEmpty = <T>(it: T | undefined | null): it is T =>
  it !== undefined && it !== null;

export const toggleInArray = <T>(array: T[], item: T) => {
  const i = array.indexOf(item)
  return i === -1 ? array.concat(item) : array.slice(0, i).concat(array.slice(i+1))
};
