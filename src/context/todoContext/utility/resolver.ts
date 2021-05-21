import {
    TodoListItem,
    TodoListItemCollection,
} from '../../../model/TodoListItem';

export const resolveCurrentItem = <ValueType = string>(
    items: TodoListItemCollection<ValueType>,
    currentItemId: string | null,
): TodoListItem<ValueType> | null => {
    if (!currentItemId) {
        return null;
    }

    return items.find((cursorItem) => cursorItem.id === currentItemId) || null;
};
