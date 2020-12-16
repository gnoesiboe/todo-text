import { KeyDefinition } from 'utility/keyboardNavigationUtilities';

const baseKeyDefinition: KeyDefinition = {
    key: '',
    shiftKey: false,
    ctrlKey: false,
    altKey: false,
    metaKey: false,
    description: '',
};

export const submitAndCreateNewItemAfterCurrent: KeyDefinition = {
    ...baseKeyDefinition,
    key: 'Enter',
    altKey: true,
    description: 'alt + enter',
};

export const createNewItemAfterCurrent: KeyDefinition = {
    ...baseKeyDefinition,
    key: 'a',
    description: 'a',
};

export const submitAndCreateNewItemBeforeCurrent: KeyDefinition = {
    ...baseKeyDefinition,
    key: 'Enter',
    altKey: true,
    shiftKey: true,
    description: 'shift + alt + enter',
};

export const createNewItemBeforeCurrent: KeyDefinition = {
    ...baseKeyDefinition,
    key: 'A',
    shiftKey: true,
    description: 'alt + shift + a',
};

export const submitItemForm: KeyDefinition = {
    ...baseKeyDefinition,
    key: 'Enter',
    ctrlKey: true,
    description: 'ctrl + enter',
};

export const deleteItemInForm: KeyDefinition = {
    ...baseKeyDefinition,
    key: 'Backspace',
    description: 'backspace',
};

export const deleteCurrentItem: KeyDefinition = {
    ...baseKeyDefinition,
    key: 'Backspace',
    altKey: true,
    description: 'alt + backspace',
};

export const stopEditWithoutSave: KeyDefinition = {
    ...baseKeyDefinition,
    key: 'Escape',
    description: 'escpape',
};

export const clearCurrentItem: KeyDefinition = {
    ...baseKeyDefinition,
    key: 'Escape',
    description: 'escape',
};

export const moveCurrentItemDown: KeyDefinition = {
    ...baseKeyDefinition,
    key: 'ArrowDown',
    altKey: true,
    description: 'alt + down',
};

export const moveCurrentItemUp: KeyDefinition = {
    ...baseKeyDefinition,
    key: 'ArrowUp',
    altKey: true,
    description: 'alt + up',
};

export const navigateToNext: KeyDefinition = {
    ...baseKeyDefinition,
    key: 'ArrowDown',
    description: 'down',
};

export const navigateToPrevious: KeyDefinition = {
    ...baseKeyDefinition,
    key: 'ArrowUp',
    description: 'up',
};

export const editCurrentItem: KeyDefinition = {
    ...baseKeyDefinition,
    key: 'e',
    description: 'e',
};

export const toggleDoneStatus: KeyDefinition = {
    ...baseKeyDefinition,
    key: ' ',
    ctrlKey: true,
    description: 'ctrl + space',
};

export const startEditNotes: KeyDefinition = {
    ...baseKeyDefinition,
    key: 'n',
    description: 'n',
};

export const toggleSortingItems: KeyDefinition = {
    ...baseKeyDefinition,
    key: 's',
    description: 's',
};
