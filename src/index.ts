import { range } from './overloading';
import { assertIsNotNull } from './assertions';
import { createGetterObject } from './mappedAndLiteral';
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

// #4 Assertions
function randomNullishValue(): number | null {
  return Math.random() < 0.9 ? Date.now() : null;
}

const maybeNullValue = randomNullishValue();
try {
  assertIsNotNull(maybeNullValue, 'Value is null');
} catch (error) {}

// is not null
console.log(maybeNullValue);

// #5 Readonly arrays and tuples
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

// #6 Conditional types
// T extends U ? X : Y
type NotNumber<T> = T extends number ? never : T;
type PromiseOrPrimitive<T> = T extends Promise<T> ? Promise<T> : T;

type A = NotNumber<string>;
type B = NotNumber<string | number>;
type C = NotNumber<2>;
type D = NotNumber<number>;

type E = PromiseOrPrimitive<Promise<string>>;
type F = PromiseOrPrimitive<string>;

// #7 Literal types
type Dimensions = 'block' | 'inline';
type Direction = 'start' | 'end';
type MarginProperty = `margin-${Dimensions}-${Direction}`;
type MarginUnit = 'px' | 'vh' | 'vw';
type MarginValue = `${number}${MarginUnit}`;
type MarginDeclaration = [MarginProperty, MarginValue];
const margin: MarginDeclaration = ['margin-block-start', '10px'];

// #8 Mapped and Literal types
const user1 = createGetterObject({
  name: 'Dmitri',
  email: 'dmitri.eryomin@gmail.com',
});

console.log(user1);
console.log(user1.getName());
console.log(user1.getEmail());
