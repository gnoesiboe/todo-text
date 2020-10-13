import React from 'react';
import type { TodoListItem } from './../../model/TodoListItem';
import { createContext, ReactNode, useContext } from 'react';
import useManageTodoListItems, {
    DeleteItemHandler,
    StopEditHandler,
    MoveToNextHandler,
    MoveCurrentItemUpHandler,
    MoveCurrentItemDownHandler,
    ToggleCurrentItemHandler,
    MoveToIndexHandler,
    StartEditHandler,
    SaveValueHandler,
    MoveToPreviousHandler,
    MarkCurrentItemHandler,
    CreateNewItemAfterCurrentHandler,
    CreateNewItemBeforeCurrentHandler,
    ClearCurrentItemHandler,
    ToggleDoneStatusHandler,
} from './hooks/useManageTodoListItems';
import useRefetchUpdatesAfterMount from './hooks/useRefetchUpdatesAfterMount';
import useRefetchOnWindowFocus from './hooks/useRefetchOnWindowFocus';
import useConfirmCloseWhenThereAreOpenChanges from './hooks/useConfirmCloseWhenThereAreOpenChanges';

type ContextValue = {
    items: TodoListItem[];
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
};

const initialValue: ContextValue = {
    items: [],
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
    };

    return (
        <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
    );
};

// don't directly expose the context, but expose a custom hook that uses the context interally
export const useTodoContext = () => useContext(TodoContext);
