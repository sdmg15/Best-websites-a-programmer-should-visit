// TypeScript Version: 3.0

import {Node, Parent, Position} from 'unist'
import {Parser, Plugin} from 'unified'

declare class RemarkParser implements Parser {
  parse(): Node
  blockMethods: string[]
  inlineTokenizers: {
    [key: string]: remarkParse.Tokenizer
  }

  inlineMethods: string[]
}

declare namespace remarkParse {
  interface Parse extends Plugin<[PartialRemarkParseOptions?]> {
    (options: PartialRemarkParseOptions): void
    Parser: typeof RemarkParser
  }

  type Parser = RemarkParser

  interface RemarkParseOptions {
    /**
     * GFM mode
     *
     * Turns on:
     * * Fenced code blocks
     * * Autolinking of URLs
     * * Deletions (strikethrough)
     * * Task lists
     * * Tables
     *
     * @defaultValue `true`
     */
    gfm: boolean

    /**
     * CommonMark mode
     *
     * Allows:
     * * Empty lines to split blockquotes
     * * Parentheses (`(` and `)`) around link and image titles
     * * Any escaped ASCII punctuation character
     * * Closing parenthesis (`)`) as an ordered list marker
     * * URL definitions in blockquotes
     *
     * Disallows:
     * * Indented code blocks directly following a paragraph
     * * ATX headings (# Hash headings) without spacing after opening hashes or and before closing hashes
     * * Setext headings (`Underline headings\n---`) when following a paragraph
     * * Newlines in link and image titles
     * * White space in link and image URLs in auto-links (links in brackets, `<` and `>`)
     * * Lazy blockquote continuation, lines not preceded by a greater than character (`>`), for lists, code, and thematic breaks
     *
     * @defaultValue `false`
     */
    commonmark: boolean

    /**
     * Defines which HTML elements are seen as block level.
     *
     * @defaultValue blocks listed in <https://github.com/remarkjs/remark/blob/main/packages/remark-parse/lib/block-elements.js>
     */
    blocks: string[]

    /**
     * Pedantic mode
     *
     * Turns on:
     * * Emphasis (`_alpha_`) and importance (`__bravo__`) with underscores in words
     * * Unordered lists with different markers (`*`, `-`, `+`)
     * * If commonmark is also turned on, ordered lists with different markers (`.`, `)`)
     * * And removes less spaces in list items (at most four, instead of the whole indent)
     *
     * @defaultValue `false`
     * @deprecated pedantic mode is buggy. It won’t be in micromark, which will be the basis of a future version of remark.
     */
    pedantic: boolean
  }

  type PartialRemarkParseOptions = Partial<RemarkParseOptions>

  interface Add {
    (node: Node, parent?: Parent): Node
    test(): Position
    reset(node: Node, parent?: Node): Node
  }

  type Eat = (value: string) => Add

  type Locator = (value: string, fromIndex: number) => number

  interface Tokenizer {
    (eat: Eat, value: string, silent: true): boolean | void
    (eat: Eat, value: string): Node | void
    locator?: Locator
    onlyAtStart?: boolean
    notInBlock?: boolean
    notInList?: boolean
    notInLink?: boolean
  }
}
declare const remarkParse: remarkParse.Parse

export = remarkParse
