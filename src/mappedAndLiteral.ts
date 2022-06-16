export function createGetterObject<TObj extends Record<string, any>>(
  obj: TObj
): PropGetters<TObj> {
  const newObj: any = {};
  for (const key of Object.keys(obj)) {
    const capitalizedKey = key[0].toUpperCase() + key.substring(1);
    const getterKey = `get${capitalizedKey}`;
    newObj[getterKey] = () => obj[key];
  }
  return newObj;
}

type PropGetters<TObj extends Record<string, any>> = {
  [TKey in string & keyof TObj as `get${Capitalize<TKey>}`]: () => TObj[TKey]; // look up type
};
