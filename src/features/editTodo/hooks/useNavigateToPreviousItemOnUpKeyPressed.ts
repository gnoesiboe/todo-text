import { checkOnlyKeyCodeIsPressed } from './../../../utility/keyboardNavigationUtilities';
import {
    checkIfThereIsTextSelected,
    checkIfCursorIsAtTheStart,
} from './../utility/textareaHelpers';
import { KeyCode } from './../../../constants/keyCodes';
import type { TodoListItem } from './../../../model/TodoListItem';
import { useTodoContext } from './../../../context/todoContext/TodoContext';
import { useEffect, RefObject } from 'react';
import { NextAction } from '../../..//context/todoContext/hooks/useManageTodoListItems';

export default function useNavigateToPreviousItemOnUpKeyPressed(
    textareaRef: RefObject<HTMLTextAreaElement>,
    item: TodoListItem,
    value: string,
) {
    const { changeItem } = useTodoContext();

    useEffect(() => {
        const onKeyUp = (event: WindowEventMap['keyup']) => {
            if (
                !checkOnlyKeyCodeIsPressed(event, KeyCode.Up) ||
                !textareaRef.current ||
                checkIfThereIsTextSelected(textareaRef.current) ||
                !checkIfCursorIsAtTheStart(textareaRef.current)
            ) {
                return;
            }

            event.preventDefault();

            changeItem(item.id, value, item.done, NextAction.EditPrevious);
        };

        window.addEventListener('keyup', onKeyUp);

        return () => window.removeEventListener('keyup', onKeyUp);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, item, textareaRef.current, changeItem]);
}
