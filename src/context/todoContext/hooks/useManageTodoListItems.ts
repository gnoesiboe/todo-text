import { useState } from 'react';
import type { TodoListItem } from 'model/TodoListItem';
import {
    applyUpdate,
    applyDelete,
    applyToggleDoneStatus,
} from '../utility/todosMutators';
import useFetchTodoListItems from './useFetchTodoListItems';
import useEnsureThereIsAlwaysOneItemToSelectAndEdit from './useEnsureThereIsAlwaysOneItemToSelectAndEdit';
import { determineNextCurrentItem } from '../utility/currentItemResolver';
import usePersistTodoListItemsOnChange from './usePersistTodoListItemsOnChange';
import useToggleFilters from './useToggleFilters';
import useNavigateThroughItems from './useNavigateThroughItems';
import useMoveTodoListItems from './useMoveTodoListItems';
import useManageIsEditingState from './useManageIsEditingState';
import useManageCurrentItem from './useManageCurrentItem';
import useManageItemCreation from './useManageItemCreation';
import usePollForChanges from './usePollForChanges';
import useManageHasOpenChangesState from './useManageHasOpenChangesState';

export type SaveValueHandler = (
    id: string,
    value: string,
    done: boolean,
) => void;

export type DeleteItemHandler = (id: string) => void;

export type ToggleDoneStatusHandler = () => void;

export default function useManageTodoListItems() {
    const [currentItem, setCurrentItem] = useState<string | null>(null);

    const [items, setItems] = useState<TodoListItem[]>([]);

    const {
        checkHasOpenChanges,
        setHasOpenChanges,
    } = useManageHasOpenChangesState();

    const { isFetching, refetchTodos } = useFetchTodoListItems(
        setItems,
        checkHasOpenChanges,
    );

    const { isSaving } = usePersistTodoListItemsOnChange(
        items,
        isFetching,
        setHasOpenChanges,
    );

    const {
        filteredItems,
        hideDone,
        hideNotActionable,
        hideEvening,
        hideSnoozed,
        toggleHideDone,
        toggleHideNotActionable,
        toggleHideEvening,
        toggleHideSnoozed,
        matchingFilters,
    } = useToggleFilters(items);

    const { isEditing, startEdit, stopEdit } = useManageIsEditingState(
        currentItem,
    );

    const {
        toggleCurrentItem,
        markCurrentItem,
        clearCurrentItem,
    } = useManageCurrentItem(isEditing, currentItem, setCurrentItem);

    const {
        createNewItemAfterCurrent,
        createNewItemBeforeCurrent,
        createNewItemAtTheStart,
    } = useManageItemCreation(
        setItems,
        markCurrentItem,
        startEdit,
        currentItem,
    );

    useEnsureThereIsAlwaysOneItemToSelectAndEdit(items, isFetching, setItems);

    const { moveToNext, moveToPrevious } = useNavigateThroughItems(
        currentItem,
        isEditing,
        filteredItems,
        setCurrentItem,
    );

    const {
        moveCurrentItemUp,
        moveCurrentItemDown,
        moveToIndex,
        isSorting,
        startSorting,
        stopSorting,
    } = useMoveTodoListItems(currentItem, isEditing, setItems);

    const saveValue: SaveValueHandler = (id, value, done) => {
        setItems((currentItems) => applyUpdate(currentItems, id, value, done));
    };

    const deleteItem: DeleteItemHandler = (id) => {
        const nextCurrentItem = determineNextCurrentItem(currentItem, items);

        setItems(applyDelete(items, id));

        setCurrentItem(nextCurrentItem);
    };

    const toggleDoneStatus: ToggleDoneStatusHandler = () => {
        if (!currentItem || isEditing) {
            return;
        }

        setItems((currentItems) =>
            applyToggleDoneStatus(currentItems, currentItem),
        );
    };

    usePollForChanges(refetchTodos);

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
        isSorting,
        startSorting,
        stopSorting,
        currentItem,
        toggleCurrentItem,
        markCurrentItem,
        clearCurrentItem,
        checkHasOpenChanges,
        isSaving,
        isEditing,
        createNewItemAfterCurrent,
        createNewItemBeforeCurrent,
        toggleDoneStatus,
        filteredItems,
        hideDone,
        hideNotActionable,
        hideEvening,
        hideSnoozed,
        toggleHideDone,
        toggleHideNotActionable,
        toggleHideEvening,
        toggleHideSnoozed,
        matchingFilters,
        createNewItemAtTheStart,
    };
}
