import { SetHasOpenChangesHandler } from './useManageHasOpenChangesState';
import { resolveDropboxFileName } from 'utility/environmentUtlities';
import { useAuthenticationContext } from 'context/authenticationContext/AuthenticationContext';
import { pushDataToDropbox } from 'dropbox/storage/dropboxStorage';
import { useEffect, useState, useRef } from 'react';
import type { TodoListItem } from 'model/TodoListItem';

const pushToDropboxThrottle = 3000; // 3 seconds

export default function usePersistTodoListItemsOnChange(
    items: TodoListItem[],
    isFetching: boolean,
    setHasOpenChanges: SetHasOpenChangesHandler,
) {
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const isFirstRender = useRef<boolean>(true);

    const { accessToken } = useAuthenticationContext();

    // use timeout for persistance to bundle multiple changes into one after timeout has cleared
    useEffect(() => {
        if (!accessToken || isFetching) {
            return;
        }

        // prevent persisting the data on initial rendering, as there is no need to do so.
        if (isFirstRender.current) {
            isFirstRender.current = false;

            return;
        }

        setHasOpenChanges(true);

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

    return { isSaving };
}
