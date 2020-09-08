import { useTodoContext } from './../../../context/todoContext/TodoContext';
import type { TodoListItem } from './../../../model/TodoListItem';
import { NextAction } from '../../../context/todoContext/hooks/useManageTodoListItems';

export default function useHandleDoneStatusChange(item: TodoListItem) {
    const { changeItem } = useTodoContext();

    const onDoneChanged = () => {
        changeItem(item.id, item.value, !item.done, NextAction.None);
    };

    return { onDoneChanged };
}
