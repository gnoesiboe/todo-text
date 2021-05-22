import type {
    ParsedTodoValue,
    TodoListItem,
    TodoListItemCollection,
} from 'model/TodoListItem';
import { useState } from 'react';
import { applyUpdate } from '../utility/todosMutators';
import useFetchTodoListItems from './useFetchTodoListItems';
import useToggleFilters from './useToggleFilters';
import useNavigateThroughItems from './useNavigateThroughItems';
import useMoveTodoListItems from './useMoveTodoListItems';
import useManageIsEditingState from './useManageIsEditingState';
import useManageCurrentItem from './useManageCurrentItem';
import useManageItemCreation from './useManageItemCreation';
import useManageHasOpenChangesState from './useManageHasOpenChangesState';
import { transformToParsedCollection } from '../utility/todoListValueParser';
import useSnoozeCurrentItem from './useSnoozeCurrentItem';
import useManageSubItemDoneStatus from './useManageSubItemDoneStatus';
import useStateWithSyncedRef from 'hooks/useStateWithSyncedRef';
import { notifyError } from '../../../utility/notifier';
import { resolveCurrentItem } from '../utility/resolver';
import useManageItemDeletion from './useManageItemDeletion';
import { persistItemUpdate } from '../../../repository/todoListItemRepository';

export type UpdateItemHandler = (
    id: string,
    updates: Partial<TodoListItem>,
) => Promise<boolean>;

export default function useManageTodoListItems() {
    const [getCurrentItemId, setCurrentItemId, currentItemId] =
        useStateWithSyncedRef<string | null>(null);

    // @todo combine items and statuses around it, in reducer, to prevent render flow issues

    const [items, setItems] = useState<TodoListItemCollection>([]);

    const [isSaving, setIsSaving] = useState<boolean>(false);

    const { checkHasOpenChanges } = useManageHasOpenChangesState();

    const { isEditing, checkIsEditing, startEdit, stopEdit } =
        useManageIsEditingState(currentItemId);

    const { isFetching } = useFetchTodoListItems(
        setItems,
        checkHasOpenChanges,
        checkIsEditing,
    );

    const snoozeCurrentItemUntil = useSnoozeCurrentItem(
        items,
        setItems,
        currentItemId,
        setIsSaving,
    );

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

    const { toggleCurrentItem, markCurrentItem, clearCurrentItem } =
        useManageCurrentItem(isEditing, currentItemId, setCurrentItemId);

    const currentItem = resolveCurrentItem<ParsedTodoValue>(
        parsedItems,
        currentItemId,
    );

    const {
        createNewItemAfterCurrent,
        createNewItemBeforeCurrent,
        createNewItemAtTheStart,
    } = useManageItemCreation(
        setItems,
        markCurrentItem,
        startEdit,
        currentItem,
        setIsSaving,
    );

    const { moveToNext, moveToPrevious } = useNavigateThroughItems(
        currentItemId,
        isEditing,
        filteredItems,
        setCurrentItemId,
    );

    const { toggleSubItemDoneStatus } = useManageSubItemDoneStatus(
        items,
        setItems,
        getCurrentItemId,
        setIsSaving,
    );

    const {
        moveCurrentItemUp,
        moveCurrentItemDown,
        moveToIndex,
        isSorting,
        startSorting,
        stopSorting,
    } = useMoveTodoListItems(items, currentItemId, isEditing, setItems);

    const updateItem: UpdateItemHandler = async (id, updates) => {
        // optimistic updating
        setItems((currentItems) => applyUpdate(currentItems, id, updates));

        // update server values
        setIsSaving(true);

        const success = await persistItemUpdate(id, updates);

        setIsSaving(false);

        if (!success) {
            notifyError(
                'Something went wrong when updating an item. Please refresh the page',
            );
        }

        return success;
    };

    const { deleteItem } = useManageItemDeletion(
        items,
        setItems,
        currentItemId,
        setCurrentItemId,
        setIsSaving,
    );

    return {
        items: parsedItems,
        isFetching,
        stopEdit,
        startEdit,
        updateItem,
        deleteItem,
        moveToNext,
        moveToPrevious,
        moveCurrentItemUp,
        moveCurrentItemDown,
        moveToIndex,
        isSorting,
        startSorting,
        stopSorting,
        currentItemId,
        currentItem,
        toggleCurrentItem,
        markCurrentItem,
        clearCurrentItem,
        checkHasOpenChanges,
        isEditing,
        createNewItemAfterCurrent,
        createNewItemBeforeCurrent,
        toggleSubItemDoneStatus,
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
        isSaving,
    };
}
