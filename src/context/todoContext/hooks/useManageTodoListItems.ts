import { useAuthenticationContext } from './../../authenticationContext/AuthenticationContext';
import {
    fetchTodosFromDropbox,
    pollForChanges as pollDropboxForChanges,
} from './../../../storage/dropbox/dropboxClient';
import { createInitialCollection } from './../../../model/factory/todoListItemFactory';
import { useState, useEffect } from 'react';
import type { TodoListItem, Mode } from '../../../model/TodoListItem';
import {
    applyUpdate,
    applyModeChange,
    applyDelete,
    applyEditFirst,
    applyEditNext,
    applyMoveItemUp,
    applyMoveItemDown,
} from '../utility/todosMutators';

export enum NextAction {
    EditNext = 'edit_next',
    EditPrevious = 'edit_previous',
    None = 'node',
    CreateNewAfter = 'create_new_after',
    CreateNewBefore = 'create_new_before',
}

export type ChangeItemHandler = (
    id: string,
    value: string,
    done: boolean,
    nextAction: NextAction,
) => void;

export type DeleteItemHandler = (id: string) => void;

export type SetItemModeHandler = (id: string, mode: Mode) => void;

export type StartEditFirstHandler = () => void;

export type EditNextHandler = () => void;

export type MoveItemUpHandler = (id: string, value: string) => void;

export type MoveItemDownHandler = (id: string, value: string) => void;

export default function useManageTodoListItems() {
    const [items, setItems] = useState<TodoListItem[]>([]);

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

    const pollForChanges = async (accessToken: string) => {
        try {
            const hasChanges = await pollDropboxForChanges(accessToken);

            if (hasChanges) {
                fetchTodos(accessToken);
            }

            pollForChanges(accessToken);
        } catch (error) {
            // @todo notify user?!

            console.error(
                'An error occurred while polling dropbox for changes',
                error,
            );

            pollForChanges(accessToken);
        }
    };

    // fetch initial data from dropbox
    useEffect(() => {
        if (isFetching || !accessToken) {
            return;
        }

        setIsFetching(true);

        fetchTodos(accessToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken]);

    useEffect(() => {
        if (!accessToken) {
            return;
        }

        pollForChanges(accessToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken]);

    // ensure there is always at least one item to select and edit
    useEffect(() => {
        if (items.length === 0) {
            setItems(createInitialCollection());
        }
    }, [items, isFetching]);

    const changeItem: ChangeItemHandler = (id, value, done, nextAction) =>
        setItems((currentItems) =>
            applyUpdate(currentItems, id, value, done, nextAction),
        );

    const deleteItem: DeleteItemHandler = (id) =>
        setItems((currentItems) => applyDelete(currentItems, id));

    const setItemMode: SetItemModeHandler = (id, mode) =>
        setItems((items) => applyModeChange(items, id, mode));

    const startEditFirst: StartEditFirstHandler = () =>
        setItems((items) => applyEditFirst(items));

    const editNext: EditNextHandler = () =>
        setItems((items) => applyEditNext(items));

    const moveItemUp: MoveItemUpHandler = (id, value) =>
        setItems((items) => applyMoveItemUp(items, id, value));

    const moveItemDown: MoveItemDownHandler = (id, value) =>
        setItems((items) => applyMoveItemDown(items, id, value));

    return {
        items,
        isFetching,
        setItemMode,
        deleteItem,
        changeItem,
        startEditFirst,
        editNext,
        moveItemUp,
        moveItemDown,
    };
}
