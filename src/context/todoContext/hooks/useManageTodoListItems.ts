import type { ParsedTodoValue } from 'model/TodoListItem';
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
import { resolveCurrentItem } from '../utility/resolver';
import useManageItemDeletion from './useManageItemDeletion';
import useManageTodoContextState from './useManageTodoContextState';
import useManageItemUpdating from './useManageItemUpdating';

export default function useManageTodoListItems() {
    const {
        todoContextState: { currentItemId, items, statuses, appliedFilters },
        setTodoContextState,
    } = useManageTodoContextState();

    const { checkHasOpenChanges } = useManageHasOpenChangesState();

    const { startEdit, stopEdit } =
        useManageIsEditingState(setTodoContextState);

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
        toggleHideNonePriority,
        matchingFilters,
    } = useToggleFilters(parsedItems, appliedFilters, setTodoContextState);

    const { toggleCurrentItem, markCurrentItem, clearCurrentItem } =
        useManageCurrentItem(setTodoContextState);

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
        filteredItems,
        setTodoContextState,
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
        statuses,
        setTodoContextState,
    );

    const updateItem = useManageItemUpdating(setTodoContextState);

    const deleteItem = useManageItemDeletion(
        setTodoContextState,
        filteredItems,
    );

    const toggleSubItemDoneStatus =
        useManageSubItemDoneStatus(setTodoContextState);

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
