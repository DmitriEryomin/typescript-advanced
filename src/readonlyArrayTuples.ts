export function intersperse<T>(array: readonly T[], separator: T): T[] {
  const arr = [];
  for (const item of array) {
    if (arr.length !== 0) {
      arr.push(separator);
    }
    arr.push(item);
  }
  return arr;
}

export function swap<T, U>(tuple: readonly [T, U]): [U, T] {
  const [firstValue, secondValue] = tuple;
  return [secondValue, firstValue];
}
