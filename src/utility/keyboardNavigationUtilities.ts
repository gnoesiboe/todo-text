import type { KeyboardEvent } from 'react';

export type KeyDefinition = {
    key: string;
    shiftKey: boolean;
    ctrlKey: boolean;
    altKey: boolean;
    metaKey: boolean;
};

export const checkKeyDefinitionIsPressed = (
    definition: KeyDefinition,
    event: WindowEventMap['keyup'] | WindowEventMap['keydown'] | KeyboardEvent,
): boolean =>
    event.key === definition.key &&
    event.shiftKey === definition.shiftKey &&
    event.ctrlKey === definition.ctrlKey &&
    event.altKey === definition.altKey &&
    event.metaKey === definition.metaKey;
