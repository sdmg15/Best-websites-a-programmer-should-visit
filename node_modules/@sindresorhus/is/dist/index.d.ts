/// <reference types="node" />
/// <reference lib="es2016" />
/// <reference lib="es2017.sharedmemory" />
/// <reference lib="esnext.asynciterable" />
/// <reference lib="dom" />
declare type TypedArray = Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;
declare type Primitive = null | undefined | string | number | boolean | Symbol;
export interface ArrayLike {
    length: number;
}
export interface Class<T = unknown> {
    new (...args: any[]): T;
}
declare type DomElement = object & {
    nodeType: 1;
    nodeName: string;
};
declare type NodeStream = object & {
    pipe: Function;
};
export declare const enum TypeName {
    null = "null",
    boolean = "boolean",
    undefined = "undefined",
    string = "string",
    number = "number",
    symbol = "symbol",
    Function = "Function",
    GeneratorFunction = "GeneratorFunction",
    AsyncFunction = "AsyncFunction",
    Observable = "Observable",
    Array = "Array",
    Buffer = "Buffer",
    Object = "Object",
    RegExp = "RegExp",
    Date = "Date",
    Error = "Error",
    Map = "Map",
    Set = "Set",
    WeakMap = "WeakMap",
    WeakSet = "WeakSet",
    Int8Array = "Int8Array",
    Uint8Array = "Uint8Array",
    Uint8ClampedArray = "Uint8ClampedArray",
    Int16Array = "Int16Array",
    Uint16Array = "Uint16Array",
    Int32Array = "Int32Array",
    Uint32Array = "Uint32Array",
    Float32Array = "Float32Array",
    Float64Array = "Float64Array",
    ArrayBuffer = "ArrayBuffer",
    SharedArrayBuffer = "SharedArrayBuffer",
    DataView = "DataView",
    Promise = "Promise",
    URL = "URL"
}
declare function is(value: unknown): TypeName;
declare namespace is {
    const undefined: (value: unknown) => value is undefined;
    const string: (value: unknown) => value is string;
    const number: (value: unknown) => value is number;
    const function_: (value: unknown) => value is Function;
    const null_: (value: unknown) => value is null;
    const class_: (value: unknown) => value is Class<unknown>;
    const boolean: (value: unknown) => value is boolean;
    const symbol: (value: unknown) => value is Symbol;
    const numericString: (value: unknown) => boolean;
    const array: (arg: any) => arg is any[];
    const buffer: (input: unknown) => input is Buffer;
    const nullOrUndefined: (value: unknown) => value is null | undefined;
    const object: (value: unknown) => value is object;
    const iterable: (value: unknown) => value is IterableIterator<unknown>;
    const asyncIterable: (value: unknown) => value is AsyncIterableIterator<unknown>;
    const generator: (value: unknown) => value is Generator;
    const nativePromise: (value: unknown) => value is Promise<unknown>;
    const promise: (value: unknown) => value is Promise<unknown>;
    const generatorFunction: (value: unknown) => value is GeneratorFunction;
    const asyncFunction: (value: unknown) => value is Function;
    const boundFunction: (value: unknown) => value is Function;
    const regExp: (value: unknown) => value is RegExp;
    const date: (value: unknown) => value is Date;
    const error: (value: unknown) => value is Error;
    const map: (value: unknown) => value is Map<unknown, unknown>;
    const set: (value: unknown) => value is Set<unknown>;
    const weakMap: (value: unknown) => value is WeakMap<object, unknown>;
    const weakSet: (value: unknown) => value is WeakSet<object>;
    const int8Array: (value: unknown) => value is Int8Array;
    const uint8Array: (value: unknown) => value is Uint8Array;
    const uint8ClampedArray: (value: unknown) => value is Uint8ClampedArray;
    const int16Array: (value: unknown) => value is Int16Array;
    const uint16Array: (value: unknown) => value is Uint16Array;
    const int32Array: (value: unknown) => value is Int32Array;
    const uint32Array: (value: unknown) => value is Uint32Array;
    const float32Array: (value: unknown) => value is Float32Array;
    const float64Array: (value: unknown) => value is Float64Array;
    const arrayBuffer: (value: unknown) => value is ArrayBuffer;
    const sharedArrayBuffer: (value: unknown) => value is SharedArrayBuffer;
    const dataView: (value: unknown) => value is DataView;
    const directInstanceOf: <T>(instance: unknown, klass: Class<T>) => instance is T;
    const urlInstance: (value: unknown) => value is URL;
    const urlString: (value: unknown) => boolean;
    const truthy: (value: unknown) => boolean;
    const falsy: (value: unknown) => boolean;
    const nan: (value: unknown) => boolean;
    const primitive: (value: unknown) => value is Primitive;
    const integer: (value: unknown) => value is number;
    const safeInteger: (value: unknown) => value is number;
    const plainObject: (value: unknown) => boolean;
    const typedArray: (value: unknown) => value is TypedArray;
    const arrayLike: (value: unknown) => value is ArrayLike;
    const inRange: (value: number, range: number | number[]) => boolean;
    const domElement: (value: unknown) => value is DomElement;
    const observable: (value: unknown) => boolean;
    const nodeStream: (value: unknown) => value is NodeStream;
    const infinite: (value: unknown) => boolean;
    const even: (value: number) => boolean;
    const odd: (value: number) => boolean;
    const emptyArray: (value: unknown) => boolean;
    const nonEmptyArray: (value: unknown) => boolean;
    const emptyString: (value: unknown) => boolean;
    const nonEmptyString: (value: unknown) => boolean;
    const emptyStringOrWhitespace: (value: unknown) => boolean;
    const emptyObject: (value: unknown) => boolean;
    const nonEmptyObject: (value: unknown) => boolean;
    const emptySet: (value: unknown) => boolean;
    const nonEmptySet: (value: unknown) => boolean;
    const emptyMap: (value: unknown) => boolean;
    const nonEmptyMap: (value: unknown) => boolean;
    const any: (predicate: unknown, ...values: unknown[]) => boolean;
    const all: (predicate: unknown, ...values: unknown[]) => boolean;
}
export default is;
