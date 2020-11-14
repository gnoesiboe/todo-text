import React, { createContext, ReactNode, useContext } from 'react';
import useIsTouchDevice from '../../hooks/useIsTouchDevice';

type ContextValue = {
    isTouchDevice: boolean;
};

const initialValue: ContextValue = {
    isTouchDevice: false,
};

const DeviceInformationContext = createContext<ContextValue>(initialValue);

export const DeviceInformationContextProvider: React.FC<{
    children: ReactNode;
}> = ({ children }) => {
    const isTouchDevice = useIsTouchDevice(initialValue.isTouchDevice);

    const value: ContextValue = {
        isTouchDevice,
    };

    return (
        <DeviceInformationContext.Provider value={value}>
            {children}
        </DeviceInformationContext.Provider>
    );
};

export const useDeviceInformationContext = () =>
    useContext(DeviceInformationContext);
