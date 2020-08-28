import React, { createContext, ReactNode, useContext } from 'react';
import useResolveAccessTokenOrRedirect from './hooks/useResolveAccessTokenOrRedirect';

type ContextValue = {
    accessToken: string | null;
};

const initialValue: ContextValue = {
    accessToken: null,
};

const AuthenticationContext = createContext<ContextValue>(initialValue);

export const AuthenticationContextProvider: React.FC<{
    children: ReactNode;
}> = ({ children }) => {
    const { accessToken, redirecting } = useResolveAccessTokenOrRedirect();

    const value: ContextValue = {
        accessToken,
    };

    if (redirecting) {
        return <p>Redirecting to Dropbox login page..</p>;
    }

    return (
        <AuthenticationContext.Provider value={value}>
            {accessToken ? children : 'Loading..'}
        </AuthenticationContext.Provider>
    );
};

export const useAuthenticationContext = () => useContext(AuthenticationContext);
