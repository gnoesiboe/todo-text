import { TodoListItemCollection } from 'model/TodoListItem';
import { SetHasOpenChangesHandler } from './useManageHasOpenChangesState';
import { resolveDropboxFileName } from 'utility/environmentUtlities';
import { useAuthenticationAccessToken } from 'context/authenticationContext/AuthenticationContext';
import { useEffect, useState, useRef } from 'react';
import pushDataToDropbox from 'dropbox/handler/pushDataToDropbox';

const pushToDropboxThrottle = 3000; // 3 seconds

export default function usePersistTodoListItemsOnChange(
    items: TodoListItemCollection,
    isFetching: boolean,
    setHasOpenChanges: SetHasOpenChangesHandler,
    checkIsEditing: () => boolean,
) {
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const isFirstRender = useRef<boolean>(true);

    const accessToken = useAuthenticationAccessToken();

    // use timeout for persistance to bundle multiple changes into one after timeout has cleared
    useEffect(() => {
        if (!accessToken || isFetching) {
            return;
        }

        // prevent persisting the data on initial rendering, as this might result in throwing away
        // all todos in Dropbox
        if (isFirstRender.current) {
            isFirstRender.current = false;

            return;
        }

        setHasOpenChanges(true);

        if (checkIsEditing()) {
            return;
        }

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
