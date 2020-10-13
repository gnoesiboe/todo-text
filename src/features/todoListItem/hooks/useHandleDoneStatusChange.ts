import { useTodoContext } from './../../../context/todoContext/TodoContext';
import type { TodoListItem } from './../../../model/TodoListItem';

export default function useHandleDoneStatusChange(item: TodoListItem) {
    const { saveValue } = useTodoContext();

    const onDoneChanged = () => {
        saveValue(item.id, item.value, !item.done);
    };

    return { onDoneChanged };
}
