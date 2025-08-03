export function deepEqual(
  lhs: any,
  rhs: any,
  path: string = "$"
): true | string {
  if (lhs === rhs) {
    return true;
  }

  if (lhs === null || rhs === null) {
    return path;
  }

  const isArrayLhs = Array.isArray(lhs);
  const isArrayRhs = Array.isArray(rhs);
  if (isArrayLhs !== isArrayRhs) {
    return path;
  }
  if (isArrayLhs && isArrayRhs) {
    if (lhs.length !== rhs.length) {
      return path;
    }
    for (let index = 0; index < lhs.length; ++index) {
      const result = deepEqual(lhs[index], rhs[index], `${path}[${index}]`);
      if (result !== true) {
        return result;
      }
    }
    return true;
  } else if (typeof lhs === "object" && typeof rhs === "object") {
    const propertiesLhs = Object.keys(lhs);
    const propertiesRhs = Object.keys(rhs);
    if (propertiesLhs.length !== propertiesRhs.length) {
      return path;
    }
    for (const property of propertiesLhs) {
      if (!propertiesRhs.includes(property)) {
        return path;
      }
      const result = deepEqual(
        lhs[property],
        rhs[property],
        `${path}.${property}`
      );
      if (result !== true) {
        return result;
      }
    }
    return true;
  }

  return path;
}
