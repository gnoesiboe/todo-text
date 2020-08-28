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
} from '../utility/todosMutators';
import { get as getItemsFromStorage } from '../../../model/repository/todoListItemRepository';

export enum NextAction {
    EditNext = 'edit_next',
    EditPrevious = 'edit_previous',
    None = 'node',
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

export default function useManageTodoListItems() {
    const [items, setItems] = useState<TodoListItem[]>(getItemsFromStorage);

    useEffect(() => {
        if (items.length === 0) {
            setItems(createInitialCollection());
        }
    }, [items]);

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

    return {
        items,
        setItemMode,
        deleteItem,
        changeItem,
        startEditFirst,
        editNext,
        moveItemUp,
    };
}
