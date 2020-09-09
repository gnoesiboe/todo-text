import React from 'react';
import type { TodoListItem } from './../../model/TodoListItem';
import { createContext, ReactNode, useContext } from 'react';
import usePersistTodoListItemsOnChange from './hooks/usePersistTodoListItemsOnChange';
import useManageTodoListItems, {
    ChangeItemHandler,
    DeleteItemHandler,
    ClearEditModeHandler,
    StartEditFirstHandler,
    EditNextHandler,
    MoveItemUpHandler,
    MoveItemDownHandler,
    SetCurrentItemHandler,
} from './hooks/useManageTodoListItems';
import useRefetchUpdatesAfterMount from './hooks/useRefetchUpdatesAfterMount';
import useRefetchOnWindowFocus from './hooks/useRefetchOnWindowFocus';

type ContextValue = {
    items: TodoListItem[];
    isFetching: boolean;
    isSaving: boolean;
    changeItem: ChangeItemHandler;
    deleteItem: DeleteItemHandler;
    clearEditMode: ClearEditModeHandler;
    startEditFirst: StartEditFirstHandler;
    editNext: EditNextHandler;
    moveItemUp: MoveItemUpHandler;
    moveItemDown: MoveItemDownHandler;
    currentItem: string | null;
    setCurrentItem: SetCurrentItemHandler;
};

const initialValue: ContextValue = {
    items: [],
    isFetching: false,
    isSaving: false,
    changeItem: () => {},
    deleteItem: () => {},
    clearEditMode: () => {},
    startEditFirst: () => {},
    editNext: () => {},
    moveItemUp: () => {},
    moveItemDown: () => {},
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
        currentItem,
        setCurrentItem,
        refetchTodos,
    } = useManageTodoListItems();

    const { isSaving } = usePersistTodoListItemsOnChange(items, isFetching);

    useRefetchUpdatesAfterMount(
        isFetching,
        currentItem,
        refetchTodos,
        isSaving,
    );

    useRefetchOnWindowFocus(isFetching, currentItem, refetchTodos, isSaving);

    const value: ContextValue = {
        items,
        isFetching,
        isSaving,
        changeItem,
        deleteItem,
        clearEditMode,
        startEditFirst,
        editNext,
        moveItemUp,
        moveItemDown,
        currentItem,
        setCurrentItem,
    };

    return (
        <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
    );
};

// don't directly expose the context, but expose a custom hook that uses the context interally
export const useTodoContext = () => useContext(TodoContext);
