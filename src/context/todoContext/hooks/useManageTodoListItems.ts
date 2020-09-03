import { useState } from 'react';
import type { TodoListItem } from '../../../model/TodoListItem';
import {
    applyUpdate,
    applyDelete,
    applyMoveItemUp,
    applyMoveItemDown,
} from '../utility/todosMutators';
import usePollForChanges from './usePollForChanges';
import useFetchTodoListItems from './useFetchTodoListItems';
import useEnsureThereIsAlwaysOneItemToSelectAndEdit from './useEnsureThereIsAlwaysOneItemToSelectAndEdit';
import { determineNextCurrentItem } from '../utility/currentItemResolver';

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

export type ClearEditModeHandler = () => void;

export type StartEditFirstHandler = () => void;

export type EditNextHandler = () => void;

export type MoveItemUpHandler = (id: string, value: string) => void;

export type MoveItemDownHandler = (id: string, value: string) => void;

export type SetCurrentItemHandler = (id: string) => void;

export default function useManageTodoListItems() {
    const [currentItem, setCurrentItemState] = useState<string | null>(null);

    const [items, setItems] = useState<TodoListItem[]>([]);

    const { isFetching, refetchTodos } = useFetchTodoListItems(setItems);

    usePollForChanges(refetchTodos);

    useEnsureThereIsAlwaysOneItemToSelectAndEdit(items, isFetching, setItems);

    const changeItem: ChangeItemHandler = (id, value, done, nextAction) => {
        const nextItems = applyUpdate(items, id, value, done, nextAction);

        setItems(nextItems);

        setCurrentItemState(
            determineNextCurrentItem(nextAction, currentItem, nextItems),
        );
    };

    const deleteItem: DeleteItemHandler = (id) => {
        const nextCurrentItem = determineNextCurrentItem(
            NextAction.EditPrevious,
            currentItem,
            items,
        );

        setItems(applyDelete(items, id));

        setCurrentItemState(nextCurrentItem);
    };

    const clearEditMode: ClearEditModeHandler = () => setCurrentItemState(null);

    const startEditFirst: StartEditFirstHandler = () => {
        setCurrentItemState(items[0]?.id || null);
    };

    const editNext: EditNextHandler = () => {
        setCurrentItemState(
            determineNextCurrentItem(NextAction.EditNext, currentItem, items),
        );
    };

    const moveItemUp: MoveItemUpHandler = (id, value) =>
        setItems((items) => applyMoveItemUp(items, id, value));

    const moveItemDown: MoveItemDownHandler = (id, value) =>
        setItems((items) => applyMoveItemDown(items, id, value));

    const setCurrentItem: SetCurrentItemHandler = (id) =>
        setCurrentItemState(id);

    return {
        items,
        isFetching,
        clearEditMode,
        deleteItem,
        changeItem,
        startEditFirst,
        editNext,
        moveItemUp,
        moveItemDown,
        currentItem,
        setCurrentItem,
    };
}
