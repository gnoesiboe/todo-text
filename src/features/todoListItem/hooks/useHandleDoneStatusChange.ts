import type { ChangeEventHandler } from 'react';
import { useTodoContext } from './../../../context/todoContext/TodoContext';
import type { TodoListItem } from './../../../model/TodoListItem';

export default function useHandleDoneStatusChange(item: TodoListItem) {
    const { changeItem } = useTodoContext();

    const onDoneChanged: ChangeEventHandler<HTMLInputElement> = () => {
        changeItem(item.id, item.value, !item.done);
    };

    return { onDoneChanged };
}
