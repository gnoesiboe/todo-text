import React, { createContext, ReactNode, useContext } from 'react';
import useManageActivity from './hooks/useManageActivity';

type ContextValue = {
    isEditingNotes: boolean;
    startEditingNotes: () => void;
    stopEditingNotes: () => void;
};

const initialValue: ContextValue = {
    isEditingNotes: false,
    startEditingNotes: () => {},
    stopEditingNotes: () => {},
};

const ActivityContext = createContext<ContextValue>(initialValue);

export const ActivityContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const {
        isEditingNotes,
        startEditingNotes,
        stopEditingNotes,
    } = useManageActivity();

    const value: ContextValue = {
        isEditingNotes,
        startEditingNotes,
        stopEditingNotes,
    };

    return (
        <ActivityContext.Provider value={value}>
            {children}
        </ActivityContext.Provider>
    );
};

export const useIsEditingNotes = (): boolean => {
    const { isEditingNotes } = useContext(ActivityContext);

    return isEditingNotes;
};

export const useManageCurrentActivity = () => {
    const { startEditingNotes, stopEditingNotes } = useContext(ActivityContext);

    return { startEditingNotes, stopEditingNotes };
};
