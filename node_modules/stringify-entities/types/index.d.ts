// TypeScript Version: 3.0

declare namespace stringifyEntities {
  interface StringifyEntitiesOptions {
    /**
     * Whether to only escape possibly dangerous characters (`boolean`, default: `false`).
     * Those characters are `"`, `'`, `<`, `>` `&`, and `` ` ``.
     */
    escapeOnly?: boolean

    /**
     * Whether to only escape the given subset of characters (`Array.<string>`).
     */
    subset?: string[]

    /**
     * Whether to use named entities where possible (`boolean?`, default: `false`).
     */
    useNamedReferences?: boolean

    /**
     * Whether to use named entities, where possible, if that results in less bytes (`boolean?`, default: `false`).
     * **Note**: `useNamedReferences` can be omitted when using `useShortestReferences`.
     */
    useShortestReferences?: boolean

    /**
     * Whether to omit semi-colons when possible (`boolean?`, default: `false`).
     * **Note**: This creates parse errors, don’t use this except when building a minifier.
     *
     * Omitting semi-colons is possible for certain legacy named references, and numeric entities, in some cases.
     */
    omitOptionalSemicolons?: boolean

    /**
     * Only needed when operating dangerously with `omitOptionalSemicolons: true`.
     * Create entities which don’t fail in attributes (`boolean?`, default: `false`).
     */
    attribute?: boolean
  }
}

/**
 * Encode special characters in `value`.
 */
declare function stringifyEntities(
  value: string,
  options?: stringifyEntities.StringifyEntitiesOptions
): string

export = stringifyEntities
