import { TodoListItem } from './../../../model/TodoListItem';
import { useEffect } from 'react';

// should be enough to save the last changes to dropbox
const noOfSecondsAfterLastChange = 7;

export default function useRefetchAfterLastChangeIsDone(
    currentItem: string | null,
    refetchTodos: () => void,
    currentItems: TodoListItem[],
    hasOpenChanges: boolean,
) {
    useEffect(() => {
        if (currentItem || hasOpenChanges) {
            return;
        }

        const timeoutHandle = setTimeout(() => {
            if (!hasOpenChanges) {
                refetchTodos();
            }
        }, noOfSecondsAfterLastChange * 1000);

        return () => clearTimeout(timeoutHandle);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentItems, currentItem, hasOpenChanges]);
}
