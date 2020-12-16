import { MouseEventHandler } from 'react';
import { TodoListItem } from 'model/TodoListItem';
import { useTodoContext } from 'context/todoContext/TodoContext';

export default function useToggleCurrentOnClick(item: TodoListItem) {
    const { toggleCurrentItem, isEditing } = useTodoContext();

    const onClick: MouseEventHandler = (event) => {
        if (isEditing) {
            return;
        }

        // Prevent event from bubbling up to MainContainer and register a click there
        // that will deselect it again.
        event.stopPropagation();

        toggleCurrentItem(item.id);
    };

    return { onClick };
}
