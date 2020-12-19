import { CheckHasOpenChangesHandler } from './useManageHasOpenChangesState';
import { useAuthenticationContext } from 'context/authenticationContext/AuthenticationContext';
import { useState, useEffect, useCallback } from 'react';
import { TodoListItem } from 'model/TodoListItem';
import { fetchTodosFromDropbox } from 'dropbox/storage/dropboxStorage';
import { applyNewlyFetched } from '../utility/todosMutators';

export default function useFetchTodoListItems(
    setItems: React.Dispatch<React.SetStateAction<TodoListItem[]>>,
    checkHasOpenChanges: CheckHasOpenChangesHandler,
    checkIsEditing: () => boolean,
) {
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const { accessToken } = useAuthenticationContext();

    const fetchTodos = useCallback(async () => {
        if (isFetching || !accessToken || checkHasOpenChanges()) {
            return;
        }

        setIsFetching(true);

        const incomingItems = await fetchTodosFromDropbox(accessToken);

        // make sure that there are no open changes at this point. If there are
        // we cancel updating the items state, to prevent loosing them.
        if (
            Array.isArray(incomingItems) &&
            !checkHasOpenChanges() &&
            !checkIsEditing()
        ) {
            setItems((currentItems) =>
                applyNewlyFetched(currentItems, incomingItems),
            );
        }

        setIsFetching(false);
    }, [
        accessToken,
        isFetching,
        setItems,
        setIsFetching,
        checkHasOpenChanges,
        checkIsEditing,
    ]);

    // initial fetch on mount
    useEffect(() => {
        fetchTodos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { isFetching, refetchTodos: fetchTodos };
}
