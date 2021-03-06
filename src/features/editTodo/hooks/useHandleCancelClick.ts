import { useTodoContext } from './../../../context/todoContext/TodoContext';
import { ParsedTodoValue, TodoListItem } from 'model/TodoListItem';
import { MouseEventHandler } from 'react';
import { isValidValue } from '../utility/inputValidator';

export default function useHandleCancelClick(
    item: TodoListItem<ParsedTodoValue>,
    currentValue: string,
    onCancel: () => void,
) {
    const { deleteItem } = useTodoContext();

    const onCancelClick: MouseEventHandler = () => {
        if (!item.value.raw && !isValidValue(currentValue)) {
            // at this point we know we had an empty item, that now still is empty.

            deleteItem(item.id);
        }

        onCancel();
    };

    return { onCancelClick };
}
