import { useRef } from 'react';
import { TodoListItemCollectionUpdates } from '../../../model/TodoListItem';
import { batchUpdateItems } from '../../../repository/todoListItemRepository';
import { notifyError } from '../../../utility/notifier';
import { TodoContextStateSetter } from './useManageTodoContextState';
import {
    applyStartSaving,
    applyStopSaving,
} from '../utility/todoContextStateMutators';

const timeoutLength = 2000; // milliseconds

export default function useThrottleItemRankingUpdates(
    setTodoContextState: TodoContextStateSetter,
) {
    const handle = useRef<NodeJS.Timeout>();

    const queueUpdatesToPersist = (updates: TodoListItemCollectionUpdates) => {
        if (handle.current) {
            clearTimeout(handle.current);
        }

        handle.current = setTimeout(async () => {
            setTodoContextState((currentState) =>
                applyStartSaving(currentState),
            );

            // noinspection JSIgnoredPromiseFromCall
            const success = await batchUpdateItems(updates);

            setTodoContextState((currentState) =>
                applyStopSaving(currentState),
            );

            if (!success) {
                notifyError(
                    'Something went wrong while persisting the ranking. Please refresh the page and try again.',
                );
            }
        }, timeoutLength);
    };

    return { queueUpdatesToPersist };
}
