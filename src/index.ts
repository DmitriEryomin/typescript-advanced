import { range } from './overloading';
import { assertIsNotNull } from './assertions';
import { intersperse, swap } from './readonlyArrayTuples';

// #1 Optional Chaining
// #2 Nullish Coalescing

type SerializeOptions = {
  formatting?: {
    indent?: number;
    getIndent?: () => number;
  };
};

function serializeJSON(value: any, options?: SerializeOptions) {
  const indent = options?.formatting?.indent ?? 4;
  // const indent = options?.formatting?.getIndent?.();

  return JSON.stringify(value, null, indent);
}

const user = {
  name: 'Dmitri Eryomin',
  age: 27,
};

const json = serializeJSON(user, { formatting: { indent: 2 } });
const json1 = serializeJSON(user);
// const json2 = serializeJSON(user, { formatting: { getIndent: () => 4 } });
const json2 = serializeJSON(user, { formatting: { indent: 0 } });

console.log(json);
console.log(json1);
console.log(json2);

// #3 Any, Unknown type

let value: any;
value = true;
value = 12;
value = Array.prototype.map;
value = null;
value = undefined;

// It's ok in typescript but has a runtime error
// value.prop.prop.prop;

let anotherValue: unknown;
anotherValue = false;
anotherValue = 11;

// It's not ok in typescript
// anotherValue.prop.prop;
if (typeof anotherValue === 'number') {
  console.log(anotherValue.toFixed(2));
}

console.log(range(0, 6));

// #4 assertions
function randomNullishValue(): number | null {
  return Math.random() < 0.9 ? Date.now() : null;
}

const maybeNullValue = randomNullishValue();
try {
  assertIsNotNull(maybeNullValue, 'Value is null');
} catch (error) {}

// is not null
console.log(maybeNullValue);

// #5 readonly arrays and tuples
const arr = [1, 2, 3] as const;
const newArr = intersperse(arr, 0.1);
console.log(newArr);

const arr1: readonly string[] = ['a', 'b', 'c'];
const newArr1 = intersperse(arr1, 'z');
console.log(newArr1);

// Error Argument of type '(string | number)[]' is not assignable to parameter of type '[string | number, string | number]'.
// const keyValue = ['age', 27];
// const keyValue = ['age', 27] as const;

const keyValue: readonly [string, number] = ['age', 27];
const valueKey = swap(keyValue);
console.log(keyValue);
console.log(valueKey);
