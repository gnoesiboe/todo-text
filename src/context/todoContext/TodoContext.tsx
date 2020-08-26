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
} from './hooks/useManageTodoListItems';

type ContextValue = {
    items: TodoListItem[];
    changeItem: ChangeItemHandler;
    deleteItem: DeleteItemHandler;
    setItemMode: SetItemModeHandler;
    startEditFirst: StartEditFirstHandler;
    editNext: EditNextHandler;
};

const initialValue: ContextValue = {
    items: [],
    changeItem: () => {},
    deleteItem: () => {},
    setItemMode: () => {},
    startEditFirst: () => {},
    editNext: () => {},
};

const TodoContext = createContext<ContextValue>(initialValue);

export const TodoContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const {
        items,
        changeItem,
        deleteItem,
        setItemMode,
        startEditFirst,
        editNext,
    } = useManageTodoListItems();

    usePersistTodoListItemsOnChange(items);

    const value: ContextValue = {
        items,
        changeItem,
        deleteItem,
        setItemMode,
        startEditFirst,
        editNext,
    };

    return (
        <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
    );
};

// don't directly expose the context, but expose a custom hook that uses the context interally
export const useTodoContext = () => useContext(TodoContext);
