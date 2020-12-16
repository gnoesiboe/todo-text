import { useTodoContext } from 'context/todoContext/TodoContext';
import { TodoListItem } from 'model/TodoListItem';
import { MouseEventHandler } from 'react';

export default function useDeleteTodoOnClick(item: TodoListItem) {
    const { deleteItem } = useTodoContext();

    const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();

        // prevent click from deselecting todo in MainContainer
        event.stopPropagation();

        if (window.confirm('Are you sure?')) {
            deleteItem(item.id);
        }
    };

    return { onClick };
}
