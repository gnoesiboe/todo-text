import { TodoListItemCollection } from 'model/TodoListItem';
import { CheckHasOpenChangesHandler } from './useManageHasOpenChangesState';
import {
    useState,
    useEffect,
    useCallback,
    Dispatch,
    SetStateAction,
} from 'react';
import { fetchAllForUser } from '../../../repository/todoListItemRepository';
import { useLoggedInUser } from '../../authenticationContext/AuthenticationContext';
import { notifyError } from '../../../utility/notifier';
import { applyNewlyFetched } from '../utility/todosMutators';

export default function useFetchTodoListItems(
    setItems: Dispatch<SetStateAction<TodoListItemCollection>>,
    checkHasOpenChanges: CheckHasOpenChangesHandler,
    checkIsEditing: () => boolean,
) {
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const user = useLoggedInUser();

    const fetchTodosFromBackend = useCallback(async () => {
        if (isFetching || checkHasOpenChanges() || !user) {
            return;
        }

        setIsFetching(true);

        try {
            const items = await fetchAllForUser(user.id);

            // make sure that there are no open changes at this point. If there are
            // we cancel updating the items state, to prevent loosing them.
            if (!checkHasOpenChanges() && !checkIsEditing()) {
                setItems((currentItems) =>
                    applyNewlyFetched(currentItems, items),
                );
            }
        } catch (error) {
            notifyError(
                'Something went wrong when fetching the todos. Please refresh the page.',
            );
        }

        setIsFetching(false);
    }, [
        isFetching,
        setItems,
        setIsFetching,
        checkHasOpenChanges,
        checkIsEditing,
        user,
    ]);

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

    return { isFetching, refetchTodos: fetchTodosFromBackend };
}
