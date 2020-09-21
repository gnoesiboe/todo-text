import React from 'react';
import type { TodoListItem } from './../../model/TodoListItem';
import { createContext, ReactNode, useContext } from 'react';
import useManageTodoListItems, {
    ChangeItemHandler,
    DeleteItemHandler,
    ClearEditModeHandler,
    StartEditFirstHandler,
    EditNextHandler,
    MoveItemUpHandler,
    MoveItemDownHandler,
    SetCurrentItemHandler,
    MoveToIndexHandler,
} from './hooks/useManageTodoListItems';
import useRefetchUpdatesAfterMount from './hooks/useRefetchUpdatesAfterMount';
import useRefetchOnWindowFocus from './hooks/useRefetchOnWindowFocus';

type ContextValue = {
    items: TodoListItem[];
    isFetching: boolean;
    hasOpenChanges: boolean;
    isSaving: boolean;
    changeItem: ChangeItemHandler;
    deleteItem: DeleteItemHandler;
    clearEditMode: ClearEditModeHandler;
    startEditFirst: StartEditFirstHandler;
    editNext: EditNextHandler;
    moveItemUp: MoveItemUpHandler;
    moveItemDown: MoveItemDownHandler;
    moveToIndex: MoveToIndexHandler;
    currentItem: string | null;
    setCurrentItem: SetCurrentItemHandler;
};

const initialValue: ContextValue = {
    items: [],
    isFetching: false,
    hasOpenChanges: false,
    isSaving: false,
    changeItem: () => {},
    deleteItem: () => {},
    clearEditMode: () => {},
    startEditFirst: () => {},
    editNext: () => {},
    moveItemUp: () => {},
    moveItemDown: () => {},
    moveToIndex: () => {},
    currentItem: null,
    setCurrentItem: () => {},
};

const TodoContext = createContext<ContextValue>(initialValue);

export const TodoContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const {
        items,
        isFetching,
        changeItem,
        deleteItem,
        clearEditMode,
        startEditFirst,
        editNext,
        moveItemUp,
        moveItemDown,
        moveToIndex,
        currentItem,
        setCurrentItem,
        refetchTodos,
        hasOpenChanges,
        isSaving,
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

    const value: ContextValue = {
        items,
        isFetching,
        hasOpenChanges,
        isSaving,
        changeItem,
        deleteItem,
        clearEditMode,
        startEditFirst,
        editNext,
        moveItemUp,
        moveItemDown,
        moveToIndex,
        currentItem,
        setCurrentItem,
    };

    return (
        <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
    );
};

// don't directly expose the context, but expose a custom hook that uses the context interally
export const useTodoContext = () => useContext(TodoContext);
