import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

/* @see https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51 */

export enum Color {
    First = 'primary',
    Second = 'secondary',
    Third = 'tertiary',
    Fourth = 'quaternary',
}

export interface Theme {
    colors: Record<Color, string>;
}

const theme: Theme = {
    colors: {
        [Color.First]: '#264653',
        [Color.Second]: '#2a9d8f',
        [Color.Third]: '#e9c46a',
        [Color.Fourth]: '#e76f51',
    },
};

export const ThemeContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;
