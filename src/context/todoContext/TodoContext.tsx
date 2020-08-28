import React from 'react';
import type { TodoListItem } from './../../model/TodoListItem';
import { createContext, ReactNode, useContext } from 'react';
import usePersistTodoListItemsOnChange from './hooks/usePersistTodoListItemsOnChange';
import useManageTodoListItems, {
    ChangeItemHandler,
    DeleteItemHandler,
    SetItemModeHandler,
    StartEditFirstHandler,
    EditNextHandler,
    MoveItemUpHandler,
    MoveItemDownHandler,
} from './hooks/useManageTodoListItems';

type ContextValue = {
    items: TodoListItem[];
    isFetching: boolean;
    isSaving: boolean;
    changeItem: ChangeItemHandler;
    deleteItem: DeleteItemHandler;
    setItemMode: SetItemModeHandler;
    startEditFirst: StartEditFirstHandler;
    editNext: EditNextHandler;
    moveItemUp: MoveItemUpHandler;
    moveItemDown: MoveItemDownHandler;
};

const initialValue: ContextValue = {
    items: [],
    isFetching: false,
    isSaving: false,
    changeItem: () => {},
    deleteItem: () => {},
    setItemMode: () => {},
    startEditFirst: () => {},
    editNext: () => {},
    moveItemUp: () => {},
    moveItemDown: () => {},
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
        setItemMode,
        startEditFirst,
        editNext,
        moveItemUp,
        moveItemDown,
    } = useManageTodoListItems();

    const { isSaving } = usePersistTodoListItemsOnChange(items, isFetching);

    const value: ContextValue = {
        items,
        isFetching,
        isSaving,
        changeItem,
        deleteItem,
        setItemMode,
        startEditFirst,
        editNext,
        moveItemUp,
        moveItemDown,
    };

    return (
        <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
    );
};

// don't directly expose the context, but expose a custom hook that uses the context interally
export const useTodoContext = () => useContext(TodoContext);
