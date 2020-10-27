import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: Record<
            'first' | 'second' | 'third' | 'fourth' | 'fifth' | 'success',
            string
        >;
        zIndex: {
            todoListHeader: number;
            statusIndicatorContainerWrapper: number;
        };
        breakpoints: {
            small: string;
            medium: string;
            large: string;
            extraLarge: string;
        };
    }
}
