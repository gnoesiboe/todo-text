import { useAuthenticationContext } from './../../authenticationContext/AuthenticationContext';
import { pushTodosToDropbox } from '../../../dropbox/storage/dropboxStorage';
import { useState } from 'react';
import type { TodoListItem } from '../../../model/TodoListItem';
import useThrottledEffect from 'use-throttled-effect';

const pushToDropboxThrottle = 3000; // 3 seconds

export default function usePersistTodoListItemsOnChange(
    items: TodoListItem[],
    isFetching: boolean,
) {
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const { accessToken } = useAuthenticationContext();

    useThrottledEffect(
        () => {
            if (!accessToken || isFetching) {
                return;
            }

            setIsSaving(true);

            pushTodosToDropbox(accessToken, JSON.stringify(items)).finally(() =>
                setIsSaving(false),
            );
        },
        pushToDropboxThrottle,
        [items, accessToken, isFetching, setIsSaving],
    );

    return { isSaving };
}
