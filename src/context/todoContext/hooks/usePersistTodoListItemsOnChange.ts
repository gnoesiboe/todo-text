import { resolveDropboxFileName } from 'utility/environmentUtlities';
import { useAuthenticationContext } from 'context/authenticationContext/AuthenticationContext';
import { pushDataToDropbox } from 'dropbox/storage/dropboxStorage';
import { useEffect, useState, useRef } from 'react';
import type { TodoListItem } from 'model/TodoListItem';

const pushToDropboxThrottle = 3000; // 3 seconds

export default function usePersistTodoListItemsOnChange(
    items: TodoListItem[],
    isFetching: boolean,
) {
    const [hasOpenChanges, setHasOpenChanges] = useState<boolean>(false);

    const [isSaving, setIsSaving] = useState<boolean>(false);

    const isInitialRender = useRef<boolean>(true);

    const { accessToken } = useAuthenticationContext();

    // use timeout for persistance to bundle multiple changes into one after timeout has cleared
    useEffect(() => {
        if (!accessToken || isFetching) {
            return;
        }

        setHasOpenChanges(isInitialRender.current ? false : true);
        isInitialRender.current = false;

        const handle = setTimeout(() => {
            setIsSaving(true);

            pushDataToDropbox(
                accessToken,
                JSON.stringify(items),
                resolveDropboxFileName(),
            ).finally(() => {
                setHasOpenChanges(false);
                setIsSaving(false);
            });
        }, pushToDropboxThrottle);

        return () => {
            clearTimeout(handle);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items]);

    return { hasOpenChanges, isSaving };
}
