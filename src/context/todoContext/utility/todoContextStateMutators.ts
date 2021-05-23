import { TodoContextState } from '../hooks/useManageTodoContextState';
import {
    ParsedTodoValue,
    TodoListItem,
    TodoListItemCollection,
    TodoListItemCollectionUpdates,
} from '../../../model/TodoListItem';
import {
    applyCreateNewItem,
    applyDelete,
    applyNewlyFetched,
    applyUpdate,
} from './todosMutators';
import {
    determineNextCurrentItemId,
    determinePreviousCurrentItemId,
} from './currentItemResolver';

export const applyStartFetching = (
    currentState: TodoContextState,
): TodoContextState => ({
    ...currentState,
    statuses: {
        ...currentState.statuses,
        isFetching: true,
    },
});

export const applyStopFetching = (
    currentState: TodoContextState,
): TodoContextState => ({
    ...currentState,
    statuses: {
        ...currentState.statuses,
        isFetching: false,
    },
});

export const applyItemsReceivedFromBackend = (
    currentState: TodoContextState,
    incomingItems: TodoListItemCollection,
): TodoContextState => ({
    ...currentState,
    items: applyNewlyFetched(currentState.items, incomingItems),
    statuses: {
        ...currentState.statuses,
        isFetching: false,
    },
});

export const applyStopEditing = (
    currentState: TodoContextState,
): TodoContextState => ({
    ...currentState,
    statuses: {
        ...currentState.statuses,
        isEditing: false,
    },
});

export const applyStartEditing = (
    currentState: TodoContextState,
): TodoContextState => ({
    ...currentState,
    statuses: {
        ...currentState.statuses,
        isEditing: true,
    },
});

export const applySetAppliedFilterValue = (
    currentState: TodoContextState,
    filter: keyof TodoContextState['appliedFilters'],
    value: boolean,
): TodoContextState => ({
    ...currentState,
    appliedFilters: {
        ...currentState.appliedFilters,
        [filter]: value,
    },
});

export const applyToggleAppliedFilterValue = (
    currentState: TodoContextState,
    filter: keyof TodoContextState['appliedFilters'],
): TodoContextState => ({
    ...currentState,
    appliedFilters: {
        ...currentState.appliedFilters,
        [filter]: !currentState.appliedFilters[filter],
    },
});

export const applyToggleCurrentItemId = (
    currentState: TodoContextState,
    id: string,
): TodoContextState => ({
    ...currentState,
    currentItemId: currentState.currentItemId === id ? null : id,
});

export const applySetNextCurrentItem = (
    currentState: TodoContextState,
    filteredItems: TodoListItemCollection<ParsedTodoValue | string>,
): TodoContextState => ({
    ...currentState,
    currentItemId: determineNextCurrentItemId(
        currentState.currentItemId,
        filteredItems,
    ),
});

export const applySetPreviousCurrentItem = (
    currentState: TodoContextState,
    filteredItems: TodoListItemCollection<ParsedTodoValue | string>,
): TodoContextState => ({
    ...currentState,
    currentItemId: determinePreviousCurrentItemId(
        currentState.currentItemId,
        filteredItems,
    ),
});

export const applySetCurrentItemId = (
    currentState: TodoContextState,
    id: string,
): TodoContextState => ({
    ...currentState,
    currentItemId: id,
});

export const applyClearCurrentItemId = (
    currentState: TodoContextState,
): TodoContextState => ({
    ...currentState,
    currentItemId: null,
});

export const applyCreateNewItemAndStartSaving = (
    currentState: TodoContextState,
    newItem: TodoListItem,
): TodoContextState => ({
    ...currentState,
    items: applyCreateNewItem(currentState.items, newItem),
    statuses: {
        ...currentState.statuses,
        isSaving: true,
    },
});

export const applyStartSaving = (
    currentState: TodoContextState,
): TodoContextState => ({
    ...currentState,
    statuses: {
        ...currentState.statuses,
        isSaving: true,
    },
});

export const applyStopSaving = (
    currentState: TodoContextState,
): TodoContextState => ({
    ...currentState,
    statuses: {
        ...currentState.statuses,
        isSaving: false,
    },
});

export const applyDeleteItemAndStartPersisting = (
    currentState: TodoContextState,
    id: string,
): TodoContextState => ({
    ...currentState,
    items: applyDelete(currentState.items, id),
    statuses: {
        ...currentState.statuses,
        isSaving: true,
    },
});

export const applyUpdateCurrentItemValueAndStartSaving = (
    currentState: TodoContextState,
    updatedValue: string,
): TodoContextState => {
    if (!currentState.currentItemId) {
        return currentState;
    }

    return {
        ...currentState,
        items: applyUpdate(currentState.items, currentState.currentItemId, {
            value: updatedValue,
        }),
        statuses: {
            ...currentState.statuses,
            isSaving: true,
        },
    };
};

export const applyItemUpdatesAndStartSaving = (
    currentState: TodoContextState,
    id: string,
    updates: Partial<Omit<TodoListItem, 'id'>>,
): TodoContextState => ({
    ...currentState,
    items: applyUpdate(currentState.items, id, updates),
    statuses: {
        ...currentState.statuses,
        isSaving: true,
    },
});

export const applySwitchCurrentItemPositionsAndStartSaving = (
    currentState: TodoContextState,
    itemIdToSwitchWith: string | null,
    oldRank: number,
    newRank: number,
): TodoContextState => {
    if (!currentState.currentItemId) {
        return currentState;
    }

    const updatedItems = applyUpdate(
        currentState.items,
        currentState.currentItemId,
        {
            rank: newRank,
        },
    );

    const newItems = itemIdToSwitchWith
        ? applyUpdate(updatedItems, itemIdToSwitchWith, {
              rank: oldRank,
          })
        : updatedItems;

    return {
        ...currentState,
        items: newItems,
        statuses: {
            ...currentState.statuses,
            isSaving: true,
        },
    };
};

export const applyStartSorting = (
    currentState: TodoContextState,
): TodoContextState => ({
    ...currentState,
    statuses: {
        ...currentState.statuses,
        isSorting: true,
    },
});

export const applyStopSorting = (
    currentState: TodoContextState,
): TodoContextState => ({
    ...currentState,
    statuses: {
        ...currentState.statuses,
        isSorting: false,
    },
});

export const applyItemUpdateCollection = (
    currentState: TodoContextState,
    itemUpdates: TodoListItemCollectionUpdates,
): TodoContextState => {
    let nextItems = [...currentState.items];

    Object.keys(itemUpdates).forEach((id) => {
        const singleItemUpdates = itemUpdates[id];

        nextItems = applyUpdate(nextItems, id, singleItemUpdates);
    });

    return {
        ...currentState,
        items: nextItems,
    };
};
