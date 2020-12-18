import React, { createContext, ReactNode, useContext } from 'react';
import useManageEditorValue from './hooks/useManageEditorValue';
import useManageIsEditingState from './hooks/useManageIsEditingState';

type ContextValue = {
    isEditing: boolean;
    isFetching: boolean;
    value: string;
    updateValue: (newValue: string) => void;
    startEditing: () => void;
    stopEditing: () => void;
};

const initialValue: ContextValue = {
    isFetching: false,
    isEditing: false,
    value: '',
    updateValue: () => {},
    startEditing: () => {},
    stopEditing: () => {},
};

const NotesContext = createContext<ContextValue>(initialValue);

export const NotesContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { isEditing, startEditing, stopEditing } = useManageIsEditingState();

    const { value, isFetching, updateValue } = useManageEditorValue();

    const contextValue: ContextValue = {
        isFetching,
        isEditing,
        value,
        updateValue,
        startEditing,
        stopEditing,
    };

    return (
        <NotesContext.Provider value={contextValue}>
            {children}
        </NotesContext.Provider>
    );
};

export const useIsEditingNotes = (): boolean => {
    const { isEditing } = useContext(NotesContext);

    return isEditing;
};

export const useManageEditingNotesState = () => {
    const { startEditing, stopEditing } = useContext(NotesContext);

    return { startEditing, stopEditing };
};

export const useManageNotesState = () => {
    const { value, updateValue } = useContext(NotesContext);

    return { value, updateValue };
};

export const useIsFetchingNotes = () => {
    const { isFetching } = useContext(NotesContext);

    return isFetching;
};
