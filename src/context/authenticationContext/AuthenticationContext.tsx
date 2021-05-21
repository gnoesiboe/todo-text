import React, { createContext, ReactNode, useContext } from 'react';
import { User } from '../../model/User';
import useEnsureUserIsAuthenticated from './hooks/useEnsureUserIsAuthenticated';

type ContextValue = {
    user: User | null;
};

const initialValue: ContextValue = {
    user: null,
};

const AuthenticationContext = createContext<ContextValue>(initialValue);

export const AuthenticationContextProvider: React.FC<{
    children: ReactNode;
}> = ({ children }) => {
    const { user, loading } = useEnsureUserIsAuthenticated();

    const value: ContextValue = { user };

    return (
        <AuthenticationContext.Provider value={value}>
            {loading && <p>Loading..</p>}
            {user && children}
        </AuthenticationContext.Provider>
    );
};

export const useIsAuthenticated = (): boolean => {
    const { user } = useContext(AuthenticationContext);

    return !!user;
};

export const useLoggedInUser = (): User | null => {
    const { user } = useContext(AuthenticationContext);

    return user;
};
