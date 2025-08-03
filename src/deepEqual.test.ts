import { deepEqual } from "./deepEqual";

describe("deepEqual function", () => {
  test("two nulls are equal", () => {
    expect(deepEqual(null, null)).toBe(true);
  });
  test("object is equal to itself", () => {
    const testObj = {};
    expect(deepEqual(testObj, testObj)).toBe(true);
  });
  test("two empty objects are equal", () => {
    expect(deepEqual({}, {})).toBe(true);
  });
  test("objects with different shapes are not equal", () => {
    expect(deepEqual({ a: 1 }, { a: 1, b: 1 })).toBe("$");
    expect(deepEqual({ a: 1 }, { b: 1 })).toBe("$");
  });
  test("objects with properties of different type are not equal", () => {
    expect(deepEqual({ a: 1 }, { a: "1" })).toBe("$.a");
  });
  test("objects with numeric properties", () => {
    expect(deepEqual({ a: 1 }, { a: 1 })).toBe(true);
    expect(deepEqual({ a: 1 }, { a: 2 })).toBe("$.a");
    expect(deepEqual({ a: 1, b: 2 }, { b: 3, a: 1 })).toBe("$.b");
  });
  test("objects with string properties", () => {
    expect(deepEqual({ a: "test" }, { a: "test" })).toBe(true);
    expect(deepEqual({ a: "test" }, { a: "tost" })).toBe("$.a");
  });
  test("processes array properties", () => {
    expect(deepEqual({ a: [1, 2, 3] }, { a: [1, 2, 3] })).toBe(true);
    expect(deepEqual({ a: [1, 2, 3] }, { a: [1, 2, 4] })).toBe("$.a[2]");
  });
  test("objects with complex properties", () => {
    expect(
      deepEqual(
        { a: [1, 2, 3], b: 2, c: "hello" },
        { a: [1, 2, 3], b: 2, c: "hello" }
      )
    ).toBe(true);
    expect(
      deepEqual(
        { a: [1, 2, "test"], b: 2, c: "hello" },
        { a: [1, 2, "test"], b: 2, c: "hello" }
      )
    ).toBe(true);
    expect(
      deepEqual(
        { a: [1, 2, "test"], b: 2, c: "hello" },
        { a: [1, 2, "tost"], b: 2, c: "hello" }
      )
    ).toBe("$.a[2]");
    expect(
      deepEqual(
        { a: [1, { a: 1, b: 2 }, "test"], b: 2, c: "hello" },
        { a: [1, { a: 1, b: 2 }, "test"], b: 2, c: "hello" }
      )
    ).toBe(true);
    expect(
      deepEqual(
        { a: [1, { a: 1, b: 3 }, "test"], b: 2, c: "hello" },
        { a: [1, { a: 1, b: 2 }, "test"], b: 2, c: "hello" }
      )
    ).toBe("$.a[1].b");
    expect(
      deepEqual(
        { a: [1, { a: 1, b: [1, 2] }, "test"], b: 2, c: "hello" },
        { a: [1, { a: 1, b: [1, "4"] }, "test"], b: 2, c: "hello" }
      )
    ).toBe("$.a[1].b[1]");
  });
  test("objects with different nested arrays are not equal", () => {
    const a = { a: [1, 2] };
    const b = { a: [1, 2, 3] };
    expect(deepEqual(a, b)).toBe("$.a");
  });
});
