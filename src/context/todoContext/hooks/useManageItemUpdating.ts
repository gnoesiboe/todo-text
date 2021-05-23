import {
    applyItemUpdatesAndStartSaving,
    applyStopSaving,
} from '../utility/todoContextStateMutators';
import { persistItemUpdate } from '../../../repository/todoListItemRepository';
import { notifyError } from '../../../utility/notifier';
import { TodoListItem } from '../../../model/TodoListItem';
import { TodoContextStateSetter } from './useManageTodoContextState';

export type UpdateItemHandler = (
    id: string,
    updates: Partial<TodoListItem>,
) => Promise<boolean>;

export default function useManageItemUpdating(
    setTodoContextState: TodoContextStateSetter,
): UpdateItemHandler {
    return async (id, updates) => {
        // optimistic updating
        setTodoContextState((currentState) =>
            applyItemUpdatesAndStartSaving(currentState, id, updates),
        );

        // update server values
        const success = await persistItemUpdate(id, updates);

        setTodoContextState((currentState) => applyStopSaving(currentState));

        if (!success) {
            notifyError(
                'Something went wrong when updating an item. Please refresh the page',
            );
        }

        return success;
    };
}
