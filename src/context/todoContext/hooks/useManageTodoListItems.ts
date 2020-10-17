import { generateId } from './../../../utility/idGenerator';
import { useState } from 'react';
import type { TodoListItem } from '../../../model/TodoListItem';
import {
    applyUpdate,
    applyDelete,
    applyMoveCurrentItemUp,
    applyMoveCurrentItemDown,
    applyMoveToIndex,
    applyCreateNewItemAfter,
    applyCreateNewItemBefore,
    applyToggleDoneStatus,
    applyCreateNewItemAtTheStart,
} from '../utility/todosMutators';
import useFetchTodoListItems from './useFetchTodoListItems';
import useEnsureThereIsAlwaysOneItemToSelectAndEdit from './useEnsureThereIsAlwaysOneItemToSelectAndEdit';
import {
    determineNextCurrentItem,
    determinePreviousCurrentItem,
} from '../utility/currentItemResolver';
import useRefetchAfterLastChangeIsDone from './useRefetchAfterLastChangeIsDone';
import usePersistTodoListItemsOnChange from './usePersistTodoListItemsOnChange';
import useToggleFilters from './useToggleFilters';

export type SaveValueHandler = (
    id: string,
    value: string,
    done: boolean,
) => void;

export type DeleteItemHandler = (id: string) => void;

export type StopEditHandler = () => void;

export type MoveToNextHandler = () => void;

export type MoveToPreviousHandler = () => void;

export type StartEditHandler = () => void;

export type MoveCurrentItemUpHandler = () => void;

export type MoveCurrentItemDownHandler = () => void;

export type MoveToIndexHandler = (
    previousIndex: number,
    nextIndex: number,
) => void;

export type ToggleCurrentItemHandler = (id: string) => void;

export type MarkCurrentItemHandler = (id: string) => void;

export type ClearCurrentItemHandler = () => void;

export type CreateNewItemAfterCurrentHandler = () => void;

export type CreateNewItemBeforeCurrentHandler = () => void;

export type ToggleDoneStatusHandler = () => void;

export type CreateNewItemAtTheStartHandler = () => void;

export default function useManageTodoListItems() {
    const [currentItem, setCurrentItemState] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const [items, setItems] = useState<TodoListItem[]>([]);

    const { isFetching, refetchTodos } = useFetchTodoListItems(setItems);

    const { hasOpenChanges, isSaving } = usePersistTodoListItemsOnChange(
        items,
        isFetching,
    );

    const {
        filteredItems,
        hideDone,
        hideNotActionable,
        toggleHideDone,
        toggleHideNotActionable,
    } = useToggleFilters(items);

    useRefetchAfterLastChangeIsDone(
        currentItem,
        refetchTodos,
        items,
        hasOpenChanges,
    );

    useEnsureThereIsAlwaysOneItemToSelectAndEdit(items, isFetching, setItems);

    const saveValue: SaveValueHandler = (id, value, done) => {
        setItems((currentItems) => applyUpdate(currentItems, id, value, done));
    };

    const deleteItem: DeleteItemHandler = (id) => {
        const nextCurrentItem = determineNextCurrentItem(currentItem, items);

        setItems(applyDelete(items, id));

        setCurrentItemState(nextCurrentItem);
    };

    const stopEdit: StopEditHandler = () => setIsEditing(false);

    const startEdit: StartEditHandler = () => {
        if (currentItem) {
            setIsEditing(true);
        }
    };

    const moveToNext: MoveToNextHandler = () => {
        if (isEditing) {
            return;
        }

        // use filteredItems to determine next, to make sure the cursor
        // does not fall on a hidden item
        setCurrentItemState(
            determineNextCurrentItem(currentItem, filteredItems),
        );
    };

    const moveToPrevious: MoveToPreviousHandler = () => {
        if (isEditing) {
            return;
        }

        // use filteredItems to determine previous, to make sure the cursor
        // does not fall on a hidden item
        setCurrentItemState(
            determinePreviousCurrentItem(currentItem, filteredItems),
        );
    };

    const moveCurrentItemUp: MoveCurrentItemUpHandler = () => {
        if (isEditing) {
            return;
        }

        setItems((items) => applyMoveCurrentItemUp(items, currentItem));
    };

    const moveCurrentItemDown: MoveCurrentItemDownHandler = () => {
        if (isEditing) {
            return;
        }

        setItems((items) => applyMoveCurrentItemDown(items, currentItem));
    };

    const moveToIndex: MoveToIndexHandler = (previousIndex, nextIndex) =>
        setItems((items) => applyMoveToIndex(items, previousIndex, nextIndex));

    const toggleCurrentItem: ToggleCurrentItemHandler = (id) => {
        setCurrentItemState((currentId) => (currentId === id ? null : id));
    };

    const markCurrentItem: MarkCurrentItemHandler = (id) => {
        setCurrentItemState(id);
    };

    const clearCurrentItem: ClearCurrentItemHandler = () => {
        if (isEditing || !currentItem) {
            return;
        }

        setCurrentItemState(null);
    };

    const createNewItemAtTheStart: CreateNewItemAtTheStartHandler = () => {
        const id = generateId();

        setItems((currentItems) =>
            applyCreateNewItemAtTheStart(currentItems, id),
        );

        setCurrentItemState(id);
        setIsEditing(true);
    };

    const createNewItemAfterCurrent: CreateNewItemAfterCurrentHandler = () => {
        if (!currentItem) {
            throw new Error(
                'Expecting there to be a current value at this point',
            );
        }

        const id = generateId();

        setItems((currentItems) =>
            applyCreateNewItemAfter(currentItems, currentItem, id),
        );

        setCurrentItemState(id);
    };

    const createNewItemBeforeCurrent: CreateNewItemBeforeCurrentHandler = () => {
        if (!currentItem) {
            throw new Error(
                'Expecting there to be a current value at this point',
            );
        }

        const id = generateId();

        setItems((currentItems) =>
            applyCreateNewItemBefore(currentItems, currentItem, id),
        );

        setCurrentItemState(id);
    };

    const toggleDoneStatus: ToggleDoneStatusHandler = () => {
        if (!currentItem || isEditing) {
            return;
        }

        setItems((currentItems) =>
            applyToggleDoneStatus(currentItems, currentItem),
        );
    };

    return {
        items,
        isFetching,
        stopEdit,
        startEdit,
        saveValue,
        deleteItem,
        moveToNext,
        moveToPrevious,
        moveCurrentItemUp,
        moveCurrentItemDown,
        moveToIndex,
        currentItem,
        toggleCurrentItem,
        markCurrentItem,
        clearCurrentItem,
        refetchTodos,
        hasOpenChanges,
        isSaving,
        isEditing,
        createNewItemAfterCurrent,
        createNewItemBeforeCurrent,
        toggleDoneStatus,
        filteredItems,
        hideDone,
        hideNotActionable,
        toggleHideDone,
        toggleHideNotActionable,
        createNewItemAtTheStart,
    };
}
