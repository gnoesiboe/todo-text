import { useAuthenticationContext } from './../../authenticationContext/AuthenticationContext';
import { useState, useEffect } from 'react';
import { TodoListItem } from '../../../model/TodoListItem';
import { fetchTodosFromDropbox } from './../../../storage/dropbox/dropboxClient';

export default function useFetchTodoListItems(
    setItems: React.Dispatch<React.SetStateAction<TodoListItem[]>>,
) {
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const { accessToken } = useAuthenticationContext();

    const fetchTodos = async (accessToken: string) => {
        try {
            const items = await fetchTodosFromDropbox(accessToken);

            setItems(items);
        } catch (error) {
            // @todo notify user?!

            console.error(
                'An error occurred while fetching the todos from dropbox',
                error,
            );
        }

        setIsFetching(false);
    };

    useEffect(() => {
        if (isFetching || !accessToken) {
            return;
        }

        setIsFetching(true);

        fetchTodos(accessToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken]);

    const refetchTodos = () => {
        if (!accessToken) {
            throw new Error(
                'Expecting access token to be available at this point',
            );
        }

        fetchTodos(accessToken);
    };

    return { isFetching, refetchTodos };
}
