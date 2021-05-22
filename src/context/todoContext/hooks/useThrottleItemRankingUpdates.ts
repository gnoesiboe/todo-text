import { Dispatch, SetStateAction, useRef } from 'react';
import { TodoListItemCollectionUpdates } from '../../../model/TodoListItem';
import { batchUpdateItems } from '../../../repository/todoListItemRepository';
import { notifyError } from '../../../utility/notifier';

const timeoutLength = 2000; // milliseconds

export default function useThrottleItemRankingUpdates(
    setIsSaving: Dispatch<SetStateAction<boolean>>,
) {
    const handle = useRef<NodeJS.Timeout>();

    const queueUpdatesToPersist = (updates: TodoListItemCollectionUpdates) => {
        if (handle.current) {
            clearTimeout(handle.current);
        }

        handle.current = setTimeout(async () => {
            setIsSaving(true);

            // noinspection JSIgnoredPromiseFromCall
            const success = await batchUpdateItems(updates);

            setIsSaving(false);

            if (!success) {
                notifyError(
                    'Something went wrong while persisting the ranking. Please refresh the page and try again.',
                );
            }
        }, timeoutLength);
    };

    return { queueUpdatesToPersist };
}
