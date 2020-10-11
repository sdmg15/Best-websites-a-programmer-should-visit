declare module "events" {
    interface EventEmitterOptions {
        /**
         * Enables automatic capturing of promise rejection.
         */
        captureRejections?: boolean;
    }

    interface NodeEventTarget {
        once(event: string | symbol, listener: (...args: any[]) => void): this;
    }

    interface DOMEventTarget {
        addEventListener(event: string, listener: (...args: any[]) => void, opts?: { once: boolean }): any;
    }

    namespace EventEmitter {
        function once(emitter: NodeEventTarget, event: string | symbol): Promise<any[]>;
        function once(emitter: DOMEventTarget, event: string): Promise<any[]>;
        function on(emitter: EventEmitter, event: string): AsyncIterableIterator<any>;
        const captureRejectionSymbol: unique symbol;

        /**
         * This symbol shall be used to install a listener for only monitoring `'error'`
         * events. Listeners installed using this symbol are called before the regular
         * `'error'` listeners are called.
         *
         * Installing a listener using this symbol does not change the behavior once an
         * `'error'` event is emitted, therefore the process will still crash if no
         * regular `'error'` listener is installed.
         */
        const errorMonitor: unique symbol;
        /**
         * Sets or gets the default captureRejection value for all emitters.
         */
        let captureRejections: boolean;

        interface EventEmitter extends NodeJS.EventEmitter {
        }

        class EventEmitter {
            constructor(options?: EventEmitterOptions);
            /** @deprecated since v4.0.0 */
            static listenerCount(emitter: EventEmitter, event: string | symbol): number;
            static defaultMaxListeners: number;
            /**
             * This symbol shall be used to install a listener for only monitoring `'error'`
             * events. Listeners installed using this symbol are called before the regular
             * `'error'` listeners are called.
             *
             * Installing a listener using this symbol does not change the behavior once an
             * `'error'` event is emitted, therefore the process will still crash if no
             * regular `'error'` listener is installed.
             */
            static readonly errorMonitor: unique symbol;
        }
    }

    global {
        namespace NodeJS {
            interface EventEmitter {
                addListener(event: string | symbol, listener: (...args: any[]) => void): this;
                on(event: string | symbol, listener: (...args: any[]) => void): this;
                once(event: string | symbol, listener: (...args: any[]) => void): this;
                removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
                off(event: string | symbol, listener: (...args: any[]) => void): this;
                removeAllListeners(event?: string | symbol): this;
                setMaxListeners(n: number): this;
                getMaxListeners(): number;
                listeners(event: string | symbol): Function[];
                rawListeners(event: string | symbol): Function[];
                emit(event: string | symbol, ...args: any[]): boolean;
                listenerCount(type: string | symbol): number;
                // Added in Node 6...
                prependListener(event: string | symbol, listener: (...args: any[]) => void): this;
                prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this;
                eventNames(): Array<string | symbol>;
            }
        }
    }

    export = EventEmitter;
}
