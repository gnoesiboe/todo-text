import { useTodoContext } from './../../../context/todoContext/TodoContext';
import { TodoListItem } from 'model/TodoListItem';
import { MouseEventHandler } from 'react';
import { isValidValue } from '../utility/inputValidator';

export default function useHandleCancelClick(
    item: TodoListItem,
    currentValue: string,
    onCancel: () => void,
) {
    const { deleteItem } = useTodoContext();

    const onCancelClick: MouseEventHandler = (event) => {
        // prevent click event from bubbling up to the container, and de-select the current item
        event.stopPropagation();

        if (!item.value && !isValidValue(currentValue)) {
            // at this point we know we had an empty item, that now still is empty.

            deleteItem(item.id);
        }

        onCancel();
    };

    return { onCancelClick };
}
