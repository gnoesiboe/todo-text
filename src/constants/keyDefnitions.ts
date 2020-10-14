import { KeyDefinition } from './../utility/keyboardNavigationUtilities';

const baseKeyDefinition: KeyDefinition = {
    key: '',
    shiftKey: false,
    ctrlKey: false,
    altKey: false,
    metaKey: false,
};

export const submitAndCreateNewItemAfterCurrent: KeyDefinition = {
    ...baseKeyDefinition,
    key: 'Enter',
    altKey: true,
};

export const createNewItemAfterCurrent: KeyDefinition = {
    ...baseKeyDefinition,
    key: 'a',
};

export const submitAndCreateNewItemBeforeCurrent: KeyDefinition = {
    ...baseKeyDefinition,
    key: 'Enter',
    altKey: true,
    shiftKey: true,
};

export const createNewItemBeforeCurrent: KeyDefinition = {
    ...baseKeyDefinition,
    key: 'A',
    shiftKey: true,
};

export const submitItemForm: KeyDefinition = {
    ...baseKeyDefinition,
    key: 'Enter',
    ctrlKey: true,
};

export const deleteItemInForm: KeyDefinition = {
    ...baseKeyDefinition,
    key: 'Backspace',
};

export const deleteCurrentItem: KeyDefinition = {
    ...baseKeyDefinition,
    key: 'Backspace',
    altKey: true,
};

export const stopEditWithoutSave: KeyDefinition = {
    ...baseKeyDefinition,
    key: 'Escape',
};

export const clearCurrentItem: KeyDefinition = {
    ...baseKeyDefinition,
    key: 'Escape',
};

export const moveCurrentItemDown: KeyDefinition = {
    ...baseKeyDefinition,
    key: 'ArrowDown',
    altKey: true,
};

export const moveCurrentItemUp: KeyDefinition = {
    ...baseKeyDefinition,
    key: 'ArrowUp',
    altKey: true,
};

export const navigateToNext: KeyDefinition = {
    ...baseKeyDefinition,
    key: 'ArrowDown',
};

export const navigateToPrevious: KeyDefinition = {
    ...baseKeyDefinition,
    key: 'ArrowUp',
};

export const editCurrentItem: KeyDefinition = {
    ...baseKeyDefinition,
    key: 'e',
};

export const toggleDoneStatus: KeyDefinition = {
    ...baseKeyDefinition,
    key: ' ',
    ctrlKey: true,
};
