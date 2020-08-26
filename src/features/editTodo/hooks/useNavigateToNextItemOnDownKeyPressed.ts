import { NextAction } from '../../../context/todoContext/hooks/useManageTodoListItems';
import type { TodoListItem } from '../../../model/TodoListItem';
import { KeyCode } from '../../../constants/keyCodes';
import { useTodoContext } from '../../../context/todoContext/TodoContext';
import { RefObject, useEffect } from 'react';

export default function useNavigateToNextItemOnDownKeyPressed(
    textareaRef: RefObject<HTMLTextAreaElement>,
    item: TodoListItem,
    value: string,
) {
    const { changeItem } = useTodoContext();

    useEffect(() => {
        const onKeyDown = (event: WindowEventMap['keyup']) => {
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

            changeItem(item.id, value, item.done, NextAction.EditNext);
        };

        window.addEventListener('keyup', onKeyDown);

        return () => window.removeEventListener('keyup', onKeyDown);
    }, [value, item, textareaRef.current]);
}
