import React from 'react';
import type { TodoListItem } from './../../model/TodoListItem';
import { createContext, ReactNode, useContext } from 'react';
import useManageTodoListItems, {
    DeleteItemHandler,
    StopEditHandler,
    MoveCurrentItemUpHandler,
    MoveCurrentItemDownHandler,
    ToggleCurrentItemHandler,
    MoveToIndexHandler,
    StartEditHandler,
    SaveValueHandler,
    MarkCurrentItemHandler,
    CreateNewItemAfterCurrentHandler,
    CreateNewItemBeforeCurrentHandler,
    ClearCurrentItemHandler,
    ToggleDoneStatusHandler,
    CreateNewItemAtTheStartHandler,
} from './hooks/useManageTodoListItems';
import useRefetchUpdatesAfterMount from './hooks/useRefetchUpdatesAfterMount';
import useRefetchOnWindowFocus from './hooks/useRefetchOnWindowFocus';
import useConfirmCloseWhenThereAreOpenChanges from './hooks/useConfirmCloseWhenThereAreOpenChanges';
import {
    ToggleHideDoneHandler,
    ToggleHideNotWaitingHandler,
} from './hooks/useToggleFilters';
import {
    MoveToNextHandler,
    MoveToPreviousHandler,
} from './hooks/useNavigateThroughItems';

type ContextValue = {
    items: TodoListItem[];
    filteredItems: TodoListItem[];
    isFetching: boolean;
    hasOpenChanges: boolean;
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
    createNewItemAtTheStart: CreateNewItemAtTheStartHandler;
};

const initialValue: ContextValue = {
    items: [],
    filteredItems: [],
    isFetching: false,
    hasOpenChanges: false,
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
    createNewItemAtTheStart: () => {},
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
        hideNotActionable,
        toggleHideNotActionable,
        hideDone,
        toggleHideDone,
        filteredItems,
        createNewItemAtTheStart,
    } = useManageTodoListItems();

    useRefetchUpdatesAfterMount(
        isFetching,
        currentItem,
        refetchTodos,
        hasOpenChanges,
    );

    useRefetchOnWindowFocus(
        isFetching,
        currentItem,
        refetchTodos,
        hasOpenChanges,
    );

    useConfirmCloseWhenThereAreOpenChanges(hasOpenChanges);

    const value: ContextValue = {
        items,
        isFetching,
        hasOpenChanges,
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
        filteredItems,
        createNewItemAtTheStart,
    };

    return (
        <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
    );
};

// don't directly expose the context, but expose a custom hook that uses the context interally
export const useTodoContext = () => useContext(TodoContext);
