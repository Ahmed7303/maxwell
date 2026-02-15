// Shim for three/tsl — provides no-op stubs for Three Shading Language.
// TSL features (heatmap GPU compute) require WebGPU and won't work here.
// Basic globe functionality (points, arcs, polygons, labels) is unaffected.

const noop = () => noop;
noop.assign = noop;
noop.add = noop;
noop.sub = noop;
noop.mul = noop;
noop.div = noop;
noop.greaterThan = noop;
noop.lessThan = noop;
noop.equal = noop;
noop.toVar = noop;
noop.toConst = noop;

export const Fn = (fn) => (...args) => ({ compute: noop });
export const If = noop;
export const uniform = (v) => ({ value: v, assign: noop, add: noop, sub: noop, mul: noop });
export const storage = noop;
export const instanceIndex = noop;
export const Loop = noop;
export const sqrt = noop;
export const sin = noop;
export const cos = noop;
export const asin = noop;
export const exp = noop;
export const negate = noop;

const _float = noop;
export { _float as float };
