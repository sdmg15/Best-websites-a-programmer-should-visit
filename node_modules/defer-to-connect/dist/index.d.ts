/// <reference types="node" />
import { Socket } from 'net';
import { TLSSocket } from 'tls';
interface Listeners {
    connect?: () => void;
    secureConnect?: () => void;
    close?: (hadError: boolean) => void;
}
declare const deferToConnect: (socket: Socket | TLSSocket, fn: Listeners | (() => void)) => void;
export default deferToConnect;
