export const checkIfThereIsTextSelected = (
    el: HTMLTextAreaElement,
): boolean => {
    const selectionStart = el.selectionStart;
    const selectionEnd = el.selectionEnd;

    return selectionStart !== selectionEnd;
};

export const checkIfCursorIsAtTheEnd = (el: HTMLTextAreaElement): boolean => {
    const selectionStart = el.selectionStart;
    const noOfCharactersInTextarea = el.value.length;

    return selectionStart === noOfCharactersInTextarea;
};

export const checkIfCursorIsAtTheStart = (el: HTMLTextAreaElement): boolean =>
    el.selectionStart === 0;
