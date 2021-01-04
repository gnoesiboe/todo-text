import { useTodoContext } from 'context/todoContext/TodoContext';
import type { ParsedTodoValue, TodoListItem } from 'model/TodoListItem';

export default function useHandleDoneStatusChange(
    item: TodoListItem<ParsedTodoValue>,
) {
    const { saveValue } = useTodoContext();

    const onDoneChanged = () => {
        saveValue(item.id, item.value.raw, !item.done);
    };

    return { onDoneChanged };
}
