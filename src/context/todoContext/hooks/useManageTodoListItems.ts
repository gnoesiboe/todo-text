import type { ParsedTodoValue, TodoListItem } from 'model/TodoListItem';
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
import { notifyError } from '../../../utility/notifier';
import { resolveCurrentItem } from '../utility/resolver';
import useManageItemDeletion from './useManageItemDeletion';
import { persistItemUpdate } from '../../../repository/todoListItemRepository';
import useManageTodoContextState from './useManageTodoContextState';
import {
    applyItemUpdatesAndStartSaving,
    applyStopSaving,
} from '../utility/todoContextStateMutators';

export type UpdateItemHandler = (
    id: string,
    updates: Partial<TodoListItem>,
) => Promise<boolean>;

export default function useManageTodoListItems() {
    const {
        todoContextState: { currentItemId, items, statuses, appliedFilters },
        setTodoContextState,
    } = useManageTodoContextState();

    const { checkHasOpenChanges } = useManageHasOpenChangesState();

    const { startEdit, stopEdit } = useManageIsEditingState(
        currentItemId,
        setTodoContextState,
    );

    useFetchTodoListItems(
        setTodoContextState,
        statuses.isFetching,
        checkHasOpenChanges,
        statuses.isEditing,
    );

    const snoozeCurrentItemUntil = useSnoozeCurrentItem(
        items,
        setTodoContextState,
        currentItemId,
    );

    const parsedItems = transformToParsedCollection(items);

    const {
        filteredItems,
        toggleHideDone,
        toggleHideNotActionable,
        toggleHideEvening,
        toggleHideSnoozed,
        matchingFilters,
        toggleHideNonePriority,
    } = useToggleFilters(parsedItems, appliedFilters, setTodoContextState);

    const { toggleCurrentItem, markCurrentItem, clearCurrentItem } =
        useManageCurrentItem(
            statuses.isEditing,
            currentItemId,
            setTodoContextState,
        );

    const currentItem = resolveCurrentItem<ParsedTodoValue>(
        parsedItems,
        currentItemId,
    );

    const {
        createNewItemAfterCurrent,
        createNewItemBeforeCurrent,
        createNewItemAtTheStart,
    } = useManageItemCreation(
        setTodoContextState,
        markCurrentItem,
        startEdit,
        currentItem,
    );

    const { moveToNext, moveToPrevious } = useNavigateThroughItems(
        statuses.isEditing,
        filteredItems,
        setTodoContextState,
    );

    const { toggleSubItemDoneStatus } = useManageSubItemDoneStatus(
        items,
        setTodoContextState,
        currentItemId,
    );

    const {
        moveCurrentItemUp,
        moveCurrentItemDown,
        moveToIndex,
        startSorting,
        stopSorting,
    } = useMoveTodoListItems(
        items,
        currentItemId,
        statuses.isEditing,
        statuses.isSorting,
        setTodoContextState,
    );

    const updateItem: UpdateItemHandler = async (id, updates) => {
        // optimistic updating
        setTodoContextState((currentState) =>
            applyItemUpdatesAndStartSaving(currentState, id, updates),
        );

        // update server values
        const success = await persistItemUpdate(id, updates);

        setTodoContextState((currentState) => applyStopSaving(currentState));

        if (!success) {
            notifyError(
                'Something went wrong when updating an item. Please refresh the page',
            );
        }

        return success;
    };

    const { deleteItem } = useManageItemDeletion(
        setTodoContextState,
        filteredItems,
    );

    return {
        items: parsedItems,
        stopEdit,
        startEdit,
        updateItem,
        deleteItem,
        moveToNext,
        moveToPrevious,
        moveCurrentItemUp,
        moveCurrentItemDown,
        moveToIndex,
        startSorting,
        stopSorting,
        currentItemId,
        currentItem,
        toggleCurrentItem,
        markCurrentItem,
        clearCurrentItem,
        checkHasOpenChanges,
        createNewItemAfterCurrent,
        createNewItemBeforeCurrent,
        toggleSubItemDoneStatus,
        filteredItems,
        toggleHideDone,
        toggleHideNotActionable,
        toggleHideEvening,
        toggleHideSnoozed,
        toggleHideNonePriority,
        matchingFilters,
        createNewItemAtTheStart,
        snoozeCurrentItemUntil,
        ...statuses,
        ...appliedFilters,
    };
}
