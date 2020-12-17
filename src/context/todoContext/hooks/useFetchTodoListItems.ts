import { useAuthenticationContext } from 'context/authenticationContext/AuthenticationContext';
import { useState, useEffect } from 'react';
import { TodoListItem } from 'model/TodoListItem';
import { fetchTodosFromDropbox } from 'dropbox/storage/dropboxStorage';
import { applyNewlyFetched } from '../utility/todosMutators';

export default function useFetchTodoListItems(
    setItems: React.Dispatch<React.SetStateAction<TodoListItem[]>>,
) {
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const { accessToken } = useAuthenticationContext();

    const fetchTodos = async () => {
        if (isFetching || !accessToken) {
            return;
        }

        setIsFetching(true);

        const incomingItems = await fetchTodosFromDropbox(accessToken);

        if (Array.isArray(incomingItems)) {
            setItems((currentItems) =>
                applyNewlyFetched(currentItems, incomingItems),
            );
        }

        setIsFetching(false);
    };

    // initial fetch on mount
    useEffect(() => {
        fetchTodos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { isFetching, refetchTodos: fetchTodos };
}
