import { CheckHasOpenChangesHandler } from './useManageHasOpenChangesState';
import { useAuthenticationAccessToken } from 'context/authenticationContext/AuthenticationContext';
import { useState, useEffect, useCallback } from 'react';
import { TodoListItem } from 'model/TodoListItem';
import { applyNewlyFetched } from '../utility/todosMutators';
import fetchTodos from 'dropbox/handler/fetchTodos';

export default function useFetchTodoListItems(
    setItems: React.Dispatch<React.SetStateAction<TodoListItem[]>>,
    checkHasOpenChanges: CheckHasOpenChangesHandler,
    checkIsEditing: () => boolean,
) {
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const accessToken = useAuthenticationAccessToken();

    const fetchTodosFromDropbox = useCallback(async () => {
        if (isFetching || !accessToken || checkHasOpenChanges()) {
            return;
        }

        setIsFetching(true);

        const incomingItems = await fetchTodos(accessToken);

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
        fetchTodosFromDropbox();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { isFetching, refetchTodos: fetchTodosFromDropbox };
}
