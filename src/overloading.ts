import { assertIsNumber } from './assertions';

export function range(from: number, to: number): number[];
export function range(from: unknown, to: unknown): number[] {
  // assert(
  //   typeof from == 'number' && typeof to === 'number',
  //   'range() expects 2 numbers'
  // );
  assertIsNumber(from);
  assertIsNumber(to);

  const values: number[] = [];
  for (let i = from; i < to; i++) {
    values.push(i);
  }
  return values;
}
