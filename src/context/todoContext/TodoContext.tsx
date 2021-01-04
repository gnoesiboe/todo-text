import React from 'react';
import type {
    ParsedTodoValue,
    TodoListItemCollection,
} from 'model/TodoListItem';
import { createContext, ReactNode, useContext } from 'react';
import useManageTodoListItems, {
    DeleteItemHandler,
    SaveValueHandler,
    ToggleDoneStatusHandler,
} from './hooks/useManageTodoListItems';
import useConfirmCloseWhenThereAreOpenChanges from './hooks/useConfirmCloseWhenThereAreOpenChanges';
import {
    MatchingFilters,
    ToggleHideDoneHandler,
    ToggleHideEveningHandler,
    ToggleHideNotWaitingHandler,
    ToggleHideSnoozedHandler,
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

type ContextValue = {
    items: TodoListItemCollection<ParsedTodoValue>;
    filteredItems: TodoListItemCollection<ParsedTodoValue>;
    isFetching: boolean;
    isSaving: boolean;
    saveValue: SaveValueHandler;
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
    currentItem: string | null;
    toggleCurrentItem: ToggleCurrentItemHandler;
    markCurrentItem: MarkCurrentItemHandler;
    clearCurrentItem: ClearCurrentItemHandler;
    createNewItemAfterCurrent: CreateNewItemAfterCurrentHandler;
    createNewItemBeforeCurrent: CreateNewItemBeforeCurrentHandler;
    toggleDoneStatus: ToggleDoneStatusHandler;
    isEditing: boolean;
    hideDone: boolean;
    toggleHideDone: ToggleHideDoneHandler;
    hideNotActionable: boolean;
    toggleHideNotActionable: ToggleHideNotWaitingHandler;
    hideEvening: boolean;
    toggleHideEvening: ToggleHideEveningHandler;
    hideSnoozed: boolean;
    toggleHideSnoozed: ToggleHideSnoozedHandler;
    matchingFilters: MatchingFilters;
    createNewItemAtTheStart: CreateNewItemAtTheStartHandler;
    snoozeCurrentItemUntil: SnoozeCurrentItemUntilHandler;
};

const initialValue: ContextValue = {
    items: [],
    filteredItems: [],
    isFetching: false,
    saveValue: () => {},
    isSaving: false,
    deleteItem: () => {},
    stopEdit: () => {},
    startEdit: () => {},
    moveToNext: () => {},
    moveToPrevious: () => {},
    moveCurrentItemUp: () => {},
    moveCurrentItemDown: () => {},
    moveToIndex: () => {},
    isSorting: false,
    startSorting: () => {},
    stopSorting: () => {},
    currentItem: null,
    toggleCurrentItem: () => {},
    markCurrentItem: () => {},
    clearCurrentItem: () => {},
    createNewItemAfterCurrent: () => {},
    createNewItemBeforeCurrent: () => {},
    toggleDoneStatus: () => {},
    isEditing: false,
    hideDone: false,
    toggleHideDone: () => {},
    hideNotActionable: false,
    toggleHideNotActionable: () => {},
    hideEvening: true,
    toggleHideEvening: () => {},
    hideSnoozed: true,
    toggleHideSnoozed: () => {},
    matchingFilters: { snoozed: 0, done: 0, evening: 0, notActionable: 0 },
    createNewItemAtTheStart: () => {},
    snoozeCurrentItemUntil: () => {},
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
        saveValue,
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
        hideNotActionable,
        toggleHideNotActionable,
        hideDone,
        toggleHideDone,
        hideEvening,
        toggleHideEvening,
        hideSnoozed,
        toggleHideSnoozed,
        filteredItems,
        matchingFilters,
        createNewItemAtTheStart,
        snoozeCurrentItemUntil,
    } = useManageTodoListItems();

    useConfirmCloseWhenThereAreOpenChanges(checkHasOpenChanges);

    const value: ContextValue = {
        items,
        isFetching,
        saveValue,
        isSaving,
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
        currentItem,
        toggleCurrentItem,
        markCurrentItem,
        clearCurrentItem,
        createNewItemAfterCurrent,
        createNewItemBeforeCurrent,
        toggleDoneStatus,
        isEditing,
        hideNotActionable,
        toggleHideNotActionable,
        hideDone,
        toggleHideDone,
        hideEvening,
        toggleHideEvening,
        hideSnoozed,
        toggleHideSnoozed,
        filteredItems,
        matchingFilters,
        createNewItemAtTheStart,
        snoozeCurrentItemUntil,
    };

    return (
        <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
    );
};

// don't directly expose the context, but expose a custom hook that uses the context interally
export const useTodoContext = () => useContext(TodoContext);
