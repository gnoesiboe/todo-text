import React, { createContext, ReactNode, useContext } from 'react';
import useManageIsEditingState from './hooks/useManageIsEditingState';

type ContextValue = {
    isEditing: boolean;
    startEditing: () => void;
    stopEditing: () => void;
};

const initialValue: ContextValue = {
    isEditing: false,
    startEditing: () => {},
    stopEditing: () => {},
};

const NotesContext = createContext<ContextValue>(initialValue);

export const NotesContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { isEditing, startEditing, stopEditing } = useManageIsEditingState();

    const value: ContextValue = {
        isEditing,
        startEditing,
        stopEditing,
    };

    return (
        <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
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
