interface GenericObject {
  [key: string]: unknown;
}

const isPlainObject = (x: unknown) => {
  if (typeof x !== "object" || x === null) return false;
  const proto = Object.getPrototypeOf(x);
  return proto === Object.prototype || proto === null;
};

// === Deep equality check (only supports arrays, plain objects and primitive data types) ===
export const isDeeplyEqual = (a: unknown, b: unknown): boolean => {
  // === primitive values and same reference objects ===
  if (Object.is(a, b)) return true;
  if (
    typeof a !== "object" ||
    a === null ||
    typeof b !== "object" ||
    b === null
  ) {
    return false;
  }

  // === Array ===
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!isDeeplyEqual(a[i], b[i])) return false;
    }
    return true;
  }
  if (Array.isArray(a) || Array.isArray(b)) return false;

  // === Plain object ===
  if (isPlainObject(a) && isPlainObject(b)) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      if (!isDeeplyEqual((a as GenericObject)[key], (b as GenericObject)[key]))
        return false;
    }
    return true;
  }
  if (isPlainObject(a) || isPlainObject(b)) return false;

  // === Unsupported object types ===
  console.warn("Unsupported object types:", a, b);
  return false;
};

/*
refs:
https://www.syncfusion.com/blogs/post/deep-compare-javascript-objects
https://www.alexefimenko.com/posts/compare-objects
https://medium.com/@pancemarko/deep-equality-in-javascript-determining-if-two-objects-are-equal-bf98cf47e934
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness
*/
