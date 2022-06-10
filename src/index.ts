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
