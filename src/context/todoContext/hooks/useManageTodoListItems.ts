import type { TodoListItemCollection } from 'model/TodoListItem';
import { useState } from 'react';
import {
    applyUpdate,
    applyDelete,
    applyToggleDoneStatus,
} from '../utility/todosMutators';
import useFetchTodoListItems from './useFetchTodoListItems';
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
import { transformToParsedCollection } from '../utility/todoListValueParser';
import useSnoozeCurrentItem from './useSnoozeCurrentItem';

export type SaveValueHandler = (
    id: string,
    value: string,
    done: boolean,
) => void;

export type DeleteItemHandler = (id: string) => void;

export type ToggleDoneStatusHandler = () => void;

export default function useManageTodoListItems() {
    const [currentItem, setCurrentItem] = useState<string | null>(null);

    const [items, setItems] = useState<TodoListItemCollection>([]);

    const {
        checkHasOpenChanges,
        setHasOpenChanges,
    } = useManageHasOpenChangesState();

    const {
        isEditing,
        checkIsEditing,
        startEdit,
        stopEdit,
    } = useManageIsEditingState(currentItem);

    const { isFetching, refetchTodos } = useFetchTodoListItems(
        setItems,
        checkHasOpenChanges,
        checkIsEditing,
    );

    const { isSaving } = usePersistTodoListItemsOnChange(
        items,
        isFetching,
        setHasOpenChanges,
        checkIsEditing,
    );

    const snoozeCurrentItemUntil = useSnoozeCurrentItem(setItems, currentItem);

    const parsedItems = transformToParsedCollection(items);

    const {
        filteredItems,
        hideDone,
        hideNotActionable,
        hideEvening,
        hideSnoozed,
        hideNonePriority,
        toggleHideDone,
        toggleHideNotActionable,
        toggleHideEvening,
        toggleHideSnoozed,
        matchingFilters,
        toggleHideNonePriority,
    } = useToggleFilters(parsedItems);

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
        items: parsedItems,
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
        hideNonePriority,
        toggleHideDone,
        toggleHideNotActionable,
        toggleHideEvening,
        toggleHideSnoozed,
        toggleHideNonePriority,
        matchingFilters,
        createNewItemAtTheStart,
        snoozeCurrentItemUntil,
    };
}
