import { useState } from 'react';
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
import usePollForChanges from './usePollForChanges';
import useFetchTodoListItems from './useFetchTodoListItems';
import useEnsureThereIsAlwaysOneItemToSelectAndEdit from './useEnsureThereIsAlwaysOneItemToSelectAndEdit';

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

    const { isFetching, refetchTodos } = useFetchTodoListItems(setItems);

    usePollForChanges(refetchTodos);

    useEnsureThereIsAlwaysOneItemToSelectAndEdit(items, isFetching, setItems);

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
