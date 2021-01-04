import { MouseEventHandler } from 'react';
import { ParsedTodoValue, TodoListItem } from 'model/TodoListItem';
import { useTodoContext } from 'context/todoContext/TodoContext';

export default function useToggleCurrentOnClick(
    item: TodoListItem<ParsedTodoValue | string>,
) {
    const { toggleCurrentItem, isEditing } = useTodoContext();

    const onClick: MouseEventHandler = () => {
        if (isEditing) {
            return;
        }

        toggleCurrentItem(item.id);
    };

    return { onClick };
}
