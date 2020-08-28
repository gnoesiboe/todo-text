import { useTodoContext } from '../../../context/todoContext/TodoContext';
import { KeyCode } from '../../../constants/keyCodes';
import type { TodoListItem } from '../../../model/TodoListItem';
import { useEffect, RefObject } from 'react';

export default function useMoveItemDownOnKeyboardShortcutPressed(
    textareaRef: RefObject<HTMLTextAreaElement>,
    item: TodoListItem,
    value: string,
) {
    const { moveItemDown } = useTodoContext();

    useEffect(() => {
        const onKeyUp = (event: WindowEventMap['keyup']) => {
            if (
                event.keyCode !== KeyCode.Down ||
                !event.altKey ||
                event.shiftKey ||
                event.metaKey ||
                event.ctrlKey
            ) {
                return;
            }

            event.preventDefault();

            moveItemDown(item.id, value);
        };

        window.addEventListener('keyup', onKeyUp);

        return () => window.removeEventListener('keyup', onKeyUp);
    }, [textareaRef.current, item, value]);
}
