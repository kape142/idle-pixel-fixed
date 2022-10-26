import { removeEmpty } from './array';

interface ClassNameDict {
  [key:string]: boolean;
}

export const classNames = (
  classes: ClassNameDict,
  ...classList: Array<string | undefined>
): string => [
  Object.keys(classes)
    .reduce((acc, cur) => `${acc}${classes[cur] ? ` ${cur}` : ''}`, '')
    .trim(),
]
  .concat(classList.filter(removeEmpty)).join(' ');
