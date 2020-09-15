import { isValidValue } from './../utility/inputValidator';
import { useTodoContext } from './../../../context/todoContext/TodoContext';
import { KeyCode } from './../../../constants/keyCodes';
import { TodoListItem, isActionable } from './../../../model/TodoListItem';
import { useEffect } from 'react';
import { NextAction } from '../../../context/todoContext/hooks/useManageTodoListItems';

export default function useToggleDoneStatusOnKeyboardShortcut(
    item: TodoListItem,
    value: string,
) {
    const { changeItem } = useTodoContext();

    useEffect(() => {
        const onKeyUp = (event: WindowEventMap['keyup']) => {
            if (
                event.keyCode !== KeyCode.Space ||
                !event.ctrlKey ||
                event.altKey ||
                event.shiftKey ||
                event.metaKey ||
                !isValidValue(value) ||
                !isActionable(item)
            ) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            changeItem(item.id, value, !item.done, NextAction.EditCurrent);
        };

        window.addEventListener('keyup', onKeyUp);

        return () => window.removeEventListener('keyup', onKeyUp);
    }, [item, value, changeItem]);
}
