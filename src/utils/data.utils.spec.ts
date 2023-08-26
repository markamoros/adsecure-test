import { deepCopy } from './data.utils.js';

describe('deepCopy', () => {
  it('should return the same value for primitive types', () => {
    const primitives = [null, undefined, true, 42, 'string'];
    const results = primitives.map(deepCopy);
    expect(results).toEqual(primitives);
  });

  it('should deep copy arrays', () => {
    const arr = [1, 2, [3, 4]];
    const copiedArr = deepCopy(arr);
    expect(copiedArr).toEqual(arr);
    expect(copiedArr).not.toBe(arr);
    expect(copiedArr[2]).not.toBe(arr[2]);
  });

  it('should deep copy objects', () => {
    const obj = { a: 1, b: { c: 2 } };
    const copiedObj = deepCopy(obj);
    expect(copiedObj).toEqual(obj);
    expect(copiedObj).not.toBe(obj);
    expect(copiedObj.b).not.toBe(obj.b);
  });

  it('should deep copy nested structures', () => {
    const nested = { a: [1, 2, { b: 3 }], c: { d: [4, 5] } };
    const copiedNested = deepCopy(nested);
    expect(copiedNested).toEqual(nested);
    expect(copiedNested).not.toBe(nested);
    expect(copiedNested.a[2]).not.toBe(nested.a[2]);
    expect(copiedNested.c).not.toBe(nested.c);
    expect(copiedNested.c.d).not.toBe(nested.c.d);
  });
});
