import { KeyCode } from './../../../constants/keyCodes';
import { useTodoContext } from './../../../context/todoContext/TodoContext';
import { RefObject, useEffect } from 'react';

export default function useSaveAndNavigateToNextItemOnDownKeyPressed(
    textareaRef: RefObject<HTMLTextAreaElement>,
) {
    const { editNext } = useTodoContext();

    useEffect(() => {
        const onKeyDown = (event: WindowEventMap['keydown']) => {
            if (event.keyCode !== KeyCode.Down) {
                return;
            }

            if (!textareaRef.current) {
                return;
            }

            const selectionStart = textareaRef.current.selectionStart;
            const selectionEnd = textareaRef.current.selectionEnd;

            // text was selected, don't continue
            if (selectionStart !== selectionEnd) {
                return;
            }

            const noOfCharactersInTextarea = textareaRef.current.value.length;

            if (selectionStart !== noOfCharactersInTextarea) {
                return;
            }

            editNext();
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);
}
