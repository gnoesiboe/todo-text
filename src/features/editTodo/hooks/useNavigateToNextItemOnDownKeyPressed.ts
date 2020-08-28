import { checkOnlyKeyCodeIsPressed } from './../../../utility/keyboardNavigationUtilities';
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
        const onKeyUp = (event: WindowEventMap['keyup']) => {
            if (
                !checkOnlyKeyCodeIsPressed(event, KeyCode.Down) ||
                !textareaRef.current ||
                checkIfThereIsTextSelected(textareaRef.current) ||
                !checkIfCursorIsAtTheEnd(textareaRef.current)
            ) {
                return;
            }

            event.preventDefault();

            changeItem(item.id, value, item.done, NextAction.EditNext);
        };

        window.addEventListener('keyup', onKeyUp);

        return () => window.removeEventListener('keyup', onKeyUp);
    }, [value, item, textareaRef.current]);
}
