import { useAuthenticationContext } from './../../authenticationContext/AuthenticationContext';
import { pushTodosToDropbox } from '../../../dropbox/storage/dropboxStorage';
import { useEffect, useState } from 'react';
import type { TodoListItem } from '../../../model/TodoListItem';

const pushToDropboxThrottle = 3000; // 3 seconds

export default function usePersistTodoListItemsOnChange(
    items: TodoListItem[],
    isFetching: boolean,
) {
    const [hasOpenChanges, setHasOpenChanges] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const { accessToken } = useAuthenticationContext();

    // use timeout for persistance to bundle multiple changes into one after timeout has cleared
    useEffect(() => {
        setHasOpenChanges(true);

        if (!accessToken || isFetching) {
            return;
        }

        const handle = setTimeout(() => {
            setIsSaving(true);

            pushTodosToDropbox(accessToken, JSON.stringify(items)).finally(
                () => {
                    setHasOpenChanges(false);
                    setIsSaving(false);
                },
            );
        }, pushToDropboxThrottle);

        return () => {
            clearTimeout(handle);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items]);

    return { hasOpenChanges, isSaving };
}
