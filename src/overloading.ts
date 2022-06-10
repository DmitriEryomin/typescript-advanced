export function range(from: number, to: number): number[];
export function range(from: unknown, to: unknown): number[] {
  if (typeof from !== 'number' || typeof to !== 'number') {
    throw new Error('range() expects 2 numbers');
  }

  const values: number[] = [];

  for (let i = from; i < to; i++) {
    values.push(i);
  }

  return values;
}
