import { useRef } from 'react';
import { TodoListItemCollectionUpdates } from '../../../model/TodoListItem';
import { batchUpdateItems } from '../../../repository/todoListItemRepository';
import { notifyError } from '../../../utility/notifier';

const timeoutLength = 2000; // milliseconds

export default function useThrottleItemRankingUpdates() {
    const handle = useRef<NodeJS.Timeout>();

    const queueUpdatesToPersist = (updates: TodoListItemCollectionUpdates) => {
        if (handle.current) {
            clearTimeout(handle.current);
        }

        handle.current = setTimeout(async () => {
            // noinspection JSIgnoredPromiseFromCall
            const success = await batchUpdateItems(updates);

            if (!success) {
                notifyError(
                    'Something went wrong while persisting the ranking. Please refresh the page and try again.',
                );
            }
        }, timeoutLength);
    };

    return { queueUpdatesToPersist };
}
