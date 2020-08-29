import { useTodoContext } from './../../../context/todoContext/TodoContext';
import { KeyCode } from './../../../constants/keyCodes';
import type { TodoListItem } from './../../../model/TodoListItem';
import { useEffect } from 'react';

export default function useMoveItemUpOnKeyboardShortcutPressed(
    item: TodoListItem,
    value: string,
) {
    const { moveItemUp } = useTodoContext();

    useEffect(() => {
        const onKeyUp = (event: WindowEventMap['keyup']) => {
            if (
                event.keyCode !== KeyCode.Up ||
                !event.altKey ||
                event.shiftKey ||
                event.metaKey ||
                event.ctrlKey
            ) {
                return;
            }

            event.preventDefault();

            moveItemUp(item.id, value);
        };

        window.addEventListener('keyup', onKeyUp);

        return () => window.removeEventListener('keyup', onKeyUp);
    }, [item, value, moveItemUp]);
}
