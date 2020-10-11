// TypeScript Version: 3.4

import {Node} from 'unist'
import {Transformer} from 'unified'
import {Test} from 'unist-util-is'

declare namespace messageControl {
  /**
   * A comment marker.
   */
  interface Marker<N extends Node> {
    /**
     * Name of marker
     */
    name: string

    /**
     * Value after name
     */
    attributes: string

    /**
     * Parsed attributes
     */
    parameters: Record<string, unknown>

    /**
     * Reference to given node
     */
    node: N
  }

  /**
   * Parse a possible comment marker node to a Marker
   */
  type MarkerParser<N extends Node> = (node: N) => Marker<N> | null

  interface MessageControlOptionsWithReset<T extends Node>
    extends BaseMessageControlOptions<T> {
    /**
     * Whether to treat all messages as turned off initially
     */
    reset: true

    /**
     * List of `ruleId`s to initially turn on.
     */
    enable?: string[]
  }

  interface MessageControlOptionsWithoutReset<T extends Node>
    extends BaseMessageControlOptions<T> {
    /**
     * Whether to treat all messages as turned off initially
     */
    reset?: false

    /**
     * List of `ruleId`s to turn off
     */
    disable?: string[]
  }

  interface BaseMessageControlOptions<T extends Node> {
    /**
     * Name of markers that can control the message sources.
     *
     * For example. `{name: 'alpha'}` controls `alpha` markers:
     *
     * `<!--alpha ignore-->`
     */
    name: string

    /**
     * Test for possible markers
     */
    test: Test<T>

    /**
     * Parse a possible marker to a comment marker object (Marker)
     * if possible the marker isn't a marker, should return `null`.
     */
    marker: MarkerParser<T>

    /**
     * List of allowed `ruleId`s. When given a warning is shown
     * when someone tries to control an unknown rule.
     *
     * For example, `{name: 'alpha', known: ['bravo']}` results
     * in a warning if `charlie is configured:
     *
     * `<!--alpha ignore charlie-->`
     */
    known?: string[]

    /**
     * Sources that can be controlled with `name` markers.
     *
     * @defaultValue `MessageControlOptions.name`
     */
    sources?: string | string[]
  }

  type MessageControlOptions<T extends Node> =
    | MessageControlOptionsWithoutReset<T>
    | MessageControlOptionsWithReset<T>
}

/**
 * Enable, disable, and ignore messages with unified.
 */
declare function messageControl<T extends Node>(
  options?: messageControl.MessageControlOptions<T>
): Transformer

export = messageControl
