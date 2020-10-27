import { pushTodosToDropbox } from './../../../dropbox/storage/dropboxStorage';
import { isFileNotFoundError } from './../../../dropbox/utility/errorIdentificationUtilities';
import { useAuthenticationContext } from './../../authenticationContext/AuthenticationContext';
import { useState, useEffect } from 'react';
import { TodoListItem } from '../../../model/TodoListItem';
import { fetchTodosFromDropbox } from '../../../dropbox/storage/dropboxStorage';
import { notifyError, notifySuccess } from '../../../utility/notifier';
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

        try {
            const incomingItems = await fetchTodosFromDropbox(accessToken);

            if (Array.isArray(incomingItems)) {
                setItems((currentItems) =>
                    applyNewlyFetched(currentItems, incomingItems),
                );
            }
        } catch (error) {
            if (isFileNotFoundError(error)) {
                await pushTodosToDropbox(accessToken, '[]');

                notifySuccess(
                    'File did not exist (anymore) in Dropbox. We created a new one',
                );

                return;
            }

            const errorMessage =
                'An error occurred while fetching the todos from dropbox';

            notifyError(errorMessage);

            console.error(errorMessage, error);
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
