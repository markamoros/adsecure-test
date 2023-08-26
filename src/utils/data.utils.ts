type NestedType = NestedType[] | { [key: string]: NestedType } | string | boolean | number | null;

export function deepCopy<U extends NestedType>(input: U): U {
  if (!input) {
    return input;
  }

  if (Array.isArray(input)) {
    return input.map(deepCopy) as U;
  }

  if (typeof input === 'object') {
    const entries = Object.entries(input);
    const clonedPairs = entries.map(([key, value]) => [key, deepCopy(value)]);
    return Object.fromEntries(clonedPairs) as U;
  }

  return input
}
