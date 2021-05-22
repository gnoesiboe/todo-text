import React from 'react';
import type {
    ParsedTodoValue,
    TodoListItem,
    TodoListItemCollection,
} from 'model/TodoListItem';
import { createContext, ReactNode, useContext } from 'react';
import useManageTodoListItems, {
    UpdateItemHandler,
} from './hooks/useManageTodoListItems';
import useConfirmCloseWhenThereAreOpenChanges from './hooks/useConfirmCloseWhenThereAreOpenChanges';
import {
    MatchingFilters,
    ToggleHideDoneHandler,
    ToggleHideEveningHandler,
    ToggleHideNotWaitingHandler,
    ToggleHideSnoozedHandler,
    ToggleHideNonePriorityHandler,
} from './hooks/useToggleFilters';
import {
    MoveToNextHandler,
    MoveToPreviousHandler,
} from './hooks/useNavigateThroughItems';
import {
    MoveCurrentItemDownHandler,
    MoveCurrentItemUpHandler,
    MoveToIndexHandler,
} from './hooks/useMoveTodoListItems';
import {
    StartEditHandler,
    StopEditHandler,
} from './hooks/useManageIsEditingState';
import {
    ClearCurrentItemHandler,
    MarkCurrentItemHandler,
    ToggleCurrentItemHandler,
} from './hooks/useManageCurrentItem';
import {
    CreateNewItemAfterCurrentHandler,
    CreateNewItemAtTheStartHandler,
    CreateNewItemBeforeCurrentHandler,
} from './hooks/useManageItemCreation';
import { SnoozeCurrentItemUntilHandler } from './hooks/useSnoozeCurrentItem';
import { ToggleSubItemDoneStatusHandler } from './hooks/useManageSubItemDoneStatus';
import { DeleteItemHandler } from './hooks/useManageItemDeletion';

type ContextValue = {
    items: TodoListItemCollection<ParsedTodoValue>;
    filteredItems: TodoListItemCollection<ParsedTodoValue>;
    isFetching: boolean;
    updateItem: UpdateItemHandler;
    deleteItem: DeleteItemHandler;
    stopEdit: StopEditHandler;
    startEdit: StartEditHandler;
    moveToNext: MoveToNextHandler;
    moveToPrevious: MoveToPreviousHandler;
    moveCurrentItemUp: MoveCurrentItemUpHandler;
    moveCurrentItemDown: MoveCurrentItemDownHandler;
    moveToIndex: MoveToIndexHandler;
    isSorting: boolean;
    startSorting: () => void;
    stopSorting: () => void;
    currentItemId: string | null;
    currentItem: TodoListItem<ParsedTodoValue> | null;
    toggleCurrentItem: ToggleCurrentItemHandler;
    markCurrentItem: MarkCurrentItemHandler;
    clearCurrentItem: ClearCurrentItemHandler;
    createNewItemAfterCurrent: CreateNewItemAfterCurrentHandler;
    createNewItemBeforeCurrent: CreateNewItemBeforeCurrentHandler;
    toggleSubItemDoneStatus: ToggleSubItemDoneStatusHandler;
    isEditing: boolean;
    hideDone: boolean;
    toggleHideDone: ToggleHideDoneHandler;
    hideNotActionable: boolean;
    toggleHideNotActionable: ToggleHideNotWaitingHandler;
    hideEvening: boolean;
    toggleHideEvening: ToggleHideEveningHandler;
    hideSnoozed: boolean;
    toggleHideSnoozed: ToggleHideSnoozedHandler;
    hideNonePriority: boolean;
    toggleHideNonePriority: ToggleHideNonePriorityHandler;
    matchingFilters: MatchingFilters;
    createNewItemAtTheStart: CreateNewItemAtTheStartHandler;
    snoozeCurrentItemUntil: SnoozeCurrentItemUntilHandler;
    isSaving: boolean;
};

const initialValue: ContextValue = {
    items: [],
    filteredItems: [],
    isFetching: false,
    updateItem: async () => false,
    deleteItem: async () => false,
    stopEdit: () => {},
    startEdit: () => {},
    moveToNext: () => {},
    moveToPrevious: () => {},
    moveCurrentItemUp: async () => false,
    moveCurrentItemDown: async () => false,
    moveToIndex: async () => false,
    isSorting: false,
    startSorting: () => {},
    stopSorting: () => {},
    currentItemId: null,
    currentItem: null,
    toggleCurrentItem: () => {},
    markCurrentItem: () => {},
    clearCurrentItem: () => {},
    createNewItemAfterCurrent: () => {},
    createNewItemBeforeCurrent: () => {},
    toggleSubItemDoneStatus: async () => false,
    isEditing: false,
    hideDone: false,
    toggleHideDone: () => {},
    hideNotActionable: false,
    toggleHideNotActionable: () => {},
    hideEvening: true,
    toggleHideEvening: () => {},
    hideSnoozed: true,
    toggleHideSnoozed: () => {},
    hideNonePriority: false,
    toggleHideNonePriority: () => {},
    matchingFilters: {
        snoozed: 0,
        done: 0,
        evening: 0,
        notActionable: 0,
        nonePriority: 0,
    },
    createNewItemAtTheStart: () => {},
    snoozeCurrentItemUntil: async () => false,
    isSaving: false,
};

const TodoContext = createContext<ContextValue>(initialValue);

export const TodoContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const {
        items,
        isFetching,
        deleteItem,
        stopEdit,
        startEdit,
        updateItem,
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
        hideNotActionable,
        toggleHideNotActionable,
        hideDone,
        toggleHideDone,
        hideEvening,
        toggleHideEvening,
        hideSnoozed,
        toggleHideSnoozed,
        hideNonePriority,
        toggleHideNonePriority,
        filteredItems,
        matchingFilters,
        createNewItemAtTheStart,
        snoozeCurrentItemUntil,
        isSaving,
    } = useManageTodoListItems();

    useConfirmCloseWhenThereAreOpenChanges(checkHasOpenChanges);

    const value: ContextValue = {
        items,
        isFetching,
        updateItem,
        deleteItem,
        stopEdit,
        startEdit,
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
        createNewItemAfterCurrent,
        createNewItemBeforeCurrent,
        toggleSubItemDoneStatus,
        isEditing,
        hideNotActionable,
        toggleHideNotActionable,
        hideDone,
        toggleHideDone,
        hideEvening,
        toggleHideEvening,
        hideSnoozed,
        toggleHideSnoozed,
        hideNonePriority,
        toggleHideNonePriority,
        filteredItems,
        matchingFilters,
        createNewItemAtTheStart,
        snoozeCurrentItemUntil,
        isSaving,
    };

    return (
        <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
    );
};

// don't directly expose the context, but expose a custom hook that uses the context interally
export const useTodoContext = () => useContext(TodoContext);
