import { isString } from './string.helper';
import { flatten } from './array.helper';

type ObjectClass = { [key: string]: unknown };

export default function classNames(
  ...args: Array<string | ObjectClass | undefined>
): string {
  const flattenClass = flatten(
    args.map((value) => {
      if (isString(value)) return value;
      if (!value) return [];
      const _arr: string[] = [];
      for (const key in value as ObjectClass) {
        if (value[key]) _arr.push(key as string);
        else continue;
      }
      return _arr;
    })
  );
  const _removeDuplicate = [...new Set(flattenClass)];
  return _removeDuplicate.join(' ');
}
