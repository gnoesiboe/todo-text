import { CheckHasOpenChangesHandler } from './useManageHasOpenChangesState';
import { useEffect, useCallback } from 'react';
import { fetchAllForUser } from '../../../repository/todoListItemRepository';
import { useLoggedInUser } from '../../authenticationContext/AuthenticationContext';
import { notifyError } from '../../../utility/notifier';
import { TodoContextStateSetter } from './useManageTodoContextState';
import {
    applyItemsReceivedFromBackend,
    applyStartFetching,
    applyStopFetching,
} from '../utility/todoContextStateMutators';

export default function useFetchTodoListItems(
    setTodoContextState: TodoContextStateSetter,
    isFetching: boolean,
    checkHasOpenChanges: CheckHasOpenChangesHandler,
    isEditing: boolean,
) {
    const user = useLoggedInUser();

    const fetchTodosFromBackend = useCallback(async () => {
        if (isFetching || checkHasOpenChanges() || !user) {
            return;
        }

        setTodoContextState((currentState) => applyStartFetching(currentState));

        try {
            const incomingItems = await fetchAllForUser(user.id);

            // make sure that there are no open changes at this point. If there are
            // we cancel updating the items state, to prevent loosing them.
            if (!checkHasOpenChanges() && !isEditing) {
                setTodoContextState((currentState) =>
                    applyItemsReceivedFromBackend(currentState, incomingItems),
                );
            }
        } catch (error) {
            notifyError(
                'Something went wrong when fetching the todos. Please refresh the page.',
            );

            setTodoContextState((currentState) =>
                applyStopFetching(currentState),
            );
        }
    }, [isFetching, setTodoContextState, checkHasOpenChanges, isEditing, user]);

    // initial fetch when list is in
    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        fetchTodosFromBackend();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // refetch on window focus
    useEffect(() => {
        const onWindowFocus = () => {
            // Wait a second before re-fetching. When using confirm, the window looses focus, but we want that change to be in
            // before the refetch is done.. @todo look for better solution
            setTimeout(() => {
                // noinspection JSIgnoredPromiseFromCall
                fetchTodosFromBackend();
            }, 1000);
        };

        window.addEventListener('focus', onWindowFocus);

        return () => window.removeEventListener('focus', onWindowFocus);
    }, [fetchTodosFromBackend]);

    return { refetchTodos: fetchTodosFromBackend };
}
