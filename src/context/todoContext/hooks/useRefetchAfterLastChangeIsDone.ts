import { TodoListItem } from './../../../model/TodoListItem';
import { useEffect } from 'react';

// should be enough to save the last changes to dropbox
const noOfSecondsAfterLastChange = 7;

export default function useRefetchAfterLastChangeIsDone(
    currentItem: string | null,
    refetchTodos: () => void,
    currentItems: TodoListItem[],
) {
    useEffect(() => {
        if (currentItem) {
            return;
        }

        const timeoutHandle = setTimeout(
            () => refetchTodos(),
            noOfSecondsAfterLastChange * 1000,
        );

        return () => clearTimeout(timeoutHandle);
    }, [currentItems, currentItem, refetchTodos]);
}
