import { useEffect } from 'react';
import type { TodoListItem } from '../../../model/TodoListItem';
import { save } from '../../../model/repository/todoListItemRepository';

export default function usePersistTodoListItemsOnChange(items: TodoListItem[]) {
    useEffect(() => {
        save(items);
    }, [items]);
}
