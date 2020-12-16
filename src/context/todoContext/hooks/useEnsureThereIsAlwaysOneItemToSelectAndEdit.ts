import { TodoListItem } from 'model/TodoListItem';
import { createInitialCollection } from 'model/factory/todoListItemFactory';
import { useEffect } from 'react';

export default function useEnsureThereIsAlwaysOneItemToSelectAndEdit(
    items: TodoListItem[],
    isFetching: boolean,
    setItems: React.Dispatch<React.SetStateAction<TodoListItem[]>>,
) {
    // ensure there is always at least one item to select and edit
    useEffect(() => {
        if (isFetching) {
            return;
        }

        if (items.length === 0) {
            setItems(createInitialCollection());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items, isFetching]);
}
