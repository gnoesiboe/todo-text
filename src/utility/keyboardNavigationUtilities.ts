import type { KeyCode } from './../constants/keyCodes';

export const checkOnlyKeyCodeIsPressed = (
    event: WindowEventMap['keyup'],
    code: KeyCode,
) =>
    event.keyCode === code &&
    !event.ctrlKey &&
    !event.altKey &&
    !event.metaKey &&
    !event.shiftKey;
