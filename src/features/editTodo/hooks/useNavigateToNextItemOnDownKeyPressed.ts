import {
    checkIfThereIsTextSelected,
    checkIfCursorIsAtTheEnd,
} from './../utility/textareaHelpers';
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
            if (
                event.keyCode !== KeyCode.Down ||
                !textareaRef.current ||
                checkIfThereIsTextSelected(textareaRef.current) ||
                !checkIfCursorIsAtTheEnd(textareaRef.current)
            ) {
                return;
            }

            changeItem(item.id, value, item.done, NextAction.EditNext);
        };

        window.addEventListener('keyup', onKeyDown);

        return () => window.removeEventListener('keyup', onKeyDown);
    }, [value, item, textareaRef.current]);
}
