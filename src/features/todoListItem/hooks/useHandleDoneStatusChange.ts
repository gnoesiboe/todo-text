import { useTodoContext } from 'context/todoContext/TodoContext';
import type { ParsedTodoValue, TodoListItem } from 'model/TodoListItem';

export default function useHandleDoneStatusChange(
    item: TodoListItem<ParsedTodoValue>,
) {
    const { updateItem } = useTodoContext();

    const onDoneChanged = () => {
        // noinspection JSIgnoredPromiseFromCall
        updateItem(item.id, {
            done: !item.done,
        });
    };

    return { onDoneChanged };
}
