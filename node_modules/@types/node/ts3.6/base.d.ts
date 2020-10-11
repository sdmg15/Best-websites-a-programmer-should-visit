// NOTE: These definitions support NodeJS and TypeScript 3.5.

// NOTE: TypeScript version-specific augmentations can be found in the following paths:
//          - ~/base.d.ts         - Shared definitions common to all TypeScript versions
//          - ~/index.d.ts        - Definitions specific to TypeScript 2.1
//          - ~/ts3.5/base.d.ts   - Definitions specific to TypeScript 3.5
//          - ~/ts3.5/index.d.ts  - Definitions specific to TypeScript 3.5 with assert pulled in

// Reference required types from the default lib:
/// <reference lib="es2018" />
/// <reference lib="esnext.asynciterable" />
/// <reference lib="esnext.intl" />
/// <reference lib="esnext.bigint" />

// Base definitions for all NodeJS modules that are not specific to any version of TypeScript:
// tslint:disable-next-line:no-bad-reference
/// <reference path="../ts3.4/base.d.ts" />

// TypeScript 3.5-specific augmentations:
/// <reference path="../globals.global.d.ts" />

// TypeScript 3.5-specific augmentations:
/// <reference path="../wasi.d.ts" />
