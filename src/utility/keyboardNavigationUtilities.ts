import type { KeyboardEvent } from 'react';
import type { KeyCode } from './../constants/keyCodes';

export const checkOnlyKeyCodeIsPressed = (
    event: WindowEventMap['keyup'] | WindowEventMap['keydown'] | KeyboardEvent,
    code: KeyCode,
) =>
    event.keyCode === code &&
    !event.ctrlKey &&
    !event.altKey &&
    !event.metaKey &&
    !event.shiftKey;
