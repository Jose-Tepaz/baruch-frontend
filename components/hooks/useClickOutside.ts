"use client";

import { RefObject, useEffect } from 'react';

type Handler = (event: MouseEvent | TouchEvent) => void;

export function useClickOutside<T extends HTMLElement = HTMLElement>(
    ref: RefObject<T>,
    handler: Handler,
    mouseEvent: 'mousedown' | 'mouseup' = 'mousedown'
): void {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            const el = ref?.current;
            const target = event.target as Node;

            // Do nothing if clicking ref's element or descendent elements
            if (!el || el.contains(target)) {
                return;
            }

            handler(event);
        };

        document.addEventListener(mouseEvent, listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener(mouseEvent, listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler, mouseEvent]);
} 