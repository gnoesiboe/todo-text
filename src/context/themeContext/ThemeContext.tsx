import React, { ReactNode } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';

/* @see https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51 */

export enum Color {
    First = 'primary',
    Second = 'secondary',
    Third = 'tertiary',
    Fourth = 'quaternary',
}

const theme: DefaultTheme = {
    colors: {
        first: '#264653',
        second: '#2a9d8f',
        third: '#e9c46a',
        fourth: '#e76f51',
    },
};

export const ThemeContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;
